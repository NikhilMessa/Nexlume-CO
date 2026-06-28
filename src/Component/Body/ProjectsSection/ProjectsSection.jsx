import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectsSection.css";
import SafarnamaVideo from "../../../assets/Video/safar.mp4";
import NexshowVideo from "../../../assets/Video/NexShow.mp4";
import StyloraVideo from "../../../assets/Video/StyloraVideo.mp4";

// 👉 Backend base URL (set VITE_API_BASE in your frontend .env to override)
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5000";

// Video mapping for projects (by ID or title)
const videoMap = {
  1: SafarnamaVideo,
  2: NexshowVideo,
  3: StyloraVideo,
  SAFARNAMA: SafarnamaVideo,
  NEXSHOW: NexshowVideo,
  STYLORA: StyloraVideo,
};

// Tagline mapping for projects
const taglineMap = {
  1: "Where Adventure Meets Simplicity",
  2: "Where Cinema Meets Convenience",
  3: "Where Style Meets Simplicity",
  SAFARNAMA: "Where Adventure Meets Simplicity",
  NEXSHOW: "Where Cinema Meets Convenience",
  STYLORA: "Where Style Meets Simplicity",
};

// Fallback projects data (used when API fails or on mobile devices)
const fallbackProjects = [
  {
    id: 1,
    title: "SAFARNAMA",
    tags: ["Tours and Travel", "Logo Design"],
    video: SafarnamaVideo,
  },
  {
    id: 2,
    title: "NEXSHOW",
    tags: ["Movie Booking", "Logo Design"],
    video: NexshowVideo,
  },
  {
    id: 3,
    title: "STYLORA",
    tags: ["E-commerce", "Logo Design"],
    video: StyloraVideo,
  },
];

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(fallbackProjects); // Initialize with fallback

  // Fetch projects from backend
  useEffect(() => {
    let isMounted = true;

    // Try to fetch from API, but always have fallback ready
    fetch(`${API_BASE}/api/projects`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (!isMounted) return;

        // backend returns { data: [...] } or array directly
        const list = Array.isArray(json) ? json : json.data || [];

        // Only update if we got valid projects from API
        if (list.length > 0 && Array.isArray(list)) {
          try {
            // Map backend data to include video and tagline
            const mappedProjects = list.map((project) => ({
              ...project,
              video:
                project.video ||
                videoMap[project.id] ||
                videoMap[project.title] ||
                videoMap[project.title?.toUpperCase()],
              tagline:
                project.tagline ||
                taglineMap[project.id] ||
                taglineMap[project.title] ||
                taglineMap[project.title?.toUpperCase()],
              // Ensure description is a string (backend might return array)
              description: Array.isArray(project.description)
                ? project.description.join(" ")
                : project.description || project.overview || "",
            }));

            // Only update if we successfully mapped projects with valid data
            if (
              mappedProjects.length > 0 &&
              mappedProjects.every((p) => p.title && p.id)
            ) {
              setProjects(mappedProjects);
            } else {
              console.warn("API returned invalid projects, using fallback");
              // Keep fallback projects
            }
          } catch (error) {
            console.error("Error mapping projects, using fallback:", error);
            // Keep fallback projects
          }
        } else {
          console.warn("API returned empty or invalid data, using fallback");
          // Keep fallback projects
        }
      })
      .catch((e) => {
        console.error(
          "Failed to load projects from API, using fallback data:",
          e,
        );
        // Keep fallback projects - they're already set as initial state
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewProject = (projectId) => {
    // Scroll to top before navigating
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Small delay to ensure smooth scroll starts before navigation
    setTimeout(() => {
      navigate(`/projects/${projectId}`);
    }, 100);
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden py-16 sm:py-24 md:py-32 lg:py-40 font-primary">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-black/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-black/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Styled Heading Section */}
        <div className="projects-style-head">
          <div className="projects-style-meta">
            <span className="projects-style-line" />
            <span className="projects-style-label">PROJECT SHOWCASE</span>
          </div>
          <h2 className="projects-style-title">
            <span className="projects-style-main">OUR</span>
            <span className="projects-style-accent">PROJECTS</span>
          </h2>
          <p className="projects-style-description">
            Discover our innovative solutions and creative excellence
          </p>
        </div>

        {/* Project Cards */}
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 px-4 sm:px-0">
          {projects.slice(0, 3).map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/40 via-gray-950 to-black border border-red-500/30 rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:border-red-500/70 hover:shadow-2xl hover:shadow-red-500/25 hover:-translate-y-1 backdrop-blur-sm"
            >
              {/* Mobile Layout: Video First with Overlay Content */}
              <div className="block lg:hidden">
                {/* Video Container with Better Styling */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
                  <video
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  {/* Enhanced Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                </div>

                {/* Content Below Video with Gradient Background */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-900/80 via-black to-black/90 border-t border-red-500/20">
                  {/* Project Label */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-0.5 h-4 bg-gradient-to-b from-red-500 to-red-700"></div>
                    <span className="text-xs uppercase tracking-widest text-red-400 font-semibold">
                      Featured
                    </span>
                  </div>

                  {/* Title */}
                 <h3 className="text-2xl sm:text-3xl font-heading font-bold text-red-500 mb-3 tracking-tight leading-tight">

                    {project.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  Description
                <p className="text-white text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tagline */}
                  {/* <p className="text-sm text-red-400/70 italic font-light mb-6 pb-6 border-b border-red-500/20">
                    "{project.tagline}"
                  </p> */}

                  {/* Action Area */}
                 {/* Action Area - Mobile Only: centered, no heart */}
                    <div className="flex justify-center">
                      <button
              onClick={() => handleViewProject(project.id)}
              className="mt-auto group/btn relative inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold text-white bg-red-600 rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-2xl hover:shadow-red-500/30 overflow-hidden"
            >
                        <span>EXPLORE</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </div>
                </div>
              </div>

              {/* Desktop Layout: Full Content with Better Details */}
              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 relative p-10 xl:p-12 h-full">
                {/* Left Column - Content */}
               <div className="flex flex-col justify-start">
                  {/* Project Header with Accent Line */}
                 <div className="mb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
                      <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
                        Project
                      </span>
                    </div>
                    <h3 className="text-5xl 2xl:text-6xl font-heading font-bold text-red-500 mb-0 tracking-tight leading-tight">


                      {project.title}
                    </h3>
                    {/* <p className="text-sm uppercase tracking-widest text-red-400/80 font-medium mb-6">
                      {project.tags?.join(" • ") || "Design Excellence"}
                    </p> */}
                  </div>

                  {/* Description with Better Typography */}
                 <div className="mt-4 mb-0">
                    <p className="text-white text-base leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* CTA Button with Enhanced Styling */}
                    <button
                      onClick={() => handleViewProject(project.id)}
                      className="group/btn relative inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold text-white bg-red-600 rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-2xl hover:shadow-red-500/30 overflow-hidden"
                    >
                      <span className="relative z-10">EXPLORE PROJECT</span>
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Tagline */}
                    {/* <p className="text-sm text-gray-400 italic mt-6 font-light">
                      "{project.tagline}"
                    </p> */}
                  </div>
                </div>

                {/* Right Column - Video Preview with Overlay */}
                <div className="relative rounded-xl overflow-hidden border border-red-500/20 group min-h-[400px]">
                 <div className="relative w-full min-h-[400px] h-full">
                    <video
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-red-400/70 font-semibold mb-2">
                            Featured Project
                          </p>
                          <p className="text-lg text-white font-light">
                            {project.tagline}
                          </p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
