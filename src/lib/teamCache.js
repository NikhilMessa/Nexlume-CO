import API from "./api";

const IMAGE_PATH_CORRECTIONS = {
  "/uploads/team/mansi.jpg": "/uploads/team/Mansi.jpeg",
  "/uploads/team/Mansi.jpg": "/uploads/team/Mansi.jpeg",
};

export const teamCache = {
  members: null,
  fetchPromise: null,
};

export const resolveMemberImage = (image) => {
  if (!image) return "";
  const path = IMAGE_PATH_CORRECTIONS[image] || image;
  if (path.startsWith("/uploads")) return `${API.main}${path}`;
  return path;
};

const preloadTeamImages = (list = []) => {
  list.forEach((member) => {
    const src = resolveMemberImage(member?.image);
    if (!src) return;
    const img = new Image();
    img.src = src;
  });
};

export const prefetchTeam = async () => {
  if (teamCache.members) {
    preloadTeamImages(teamCache.members);
    return teamCache.members;
  }

  if (teamCache.fetchPromise) return teamCache.fetchPromise;

  teamCache.fetchPromise = (async () => {
    const res = await fetch(`${API.main}/api/team-members`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const json = await res.json();
    const list = Array.isArray(json) ? json : json.data || [];
    teamCache.members = list;
    preloadTeamImages(list);
    return list;
  })().finally(() => {
    teamCache.fetchPromise = null;
  });

  return teamCache.fetchPromise;
};
