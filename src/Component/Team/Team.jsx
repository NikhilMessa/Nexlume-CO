import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Team.css";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import API from "../../lib/api";
import SEO from "../SEO/SEO";
import {
  prefetchTeam,
  resolveMemberImage,
  teamCache,
} from "../../lib/teamCache";
import { OptimizedImage } from "../../components/OptimizedImage";
import TeamEmailImage from "../../assets/Team/team-email.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const TeamMemberCard = ({ member, priority = false }) => {
  return (
     <div className="team-card">
      <div className="team-card-inner">
        <div className="team-image-wrapper">
          <OptimizedImage
            src={resolveMemberImage(member.image)}
            alt={member.title}
            className="team-image"
            priority={priority}
            style={{ "--team-image-position": member.imagePosition || "center 30%" }}
          />
          <div className="team-image-overlay"></div>
        </div>
        <div className="team-content">
          <div className="team-header">
            <h3 className="team-name">{member.title}</h3>
            <p className="team-role">{member.role}</p>
          </div>

          {member.bio && <p className="team-bio">{member.bio}</p>}

          <div className="team-footer">
            {member.handle && member.url && (
              <a
                href={member.url}
                className="team-handle-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.title} LinkedIn profile`}
              >
                <span className="team-handle">{member.handle}</span>
                <FaLinkedin className="linkedin-icon" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMemberSkeleton = () => {
  return (
    <div className="team-card team-card--skeleton" aria-hidden="true">
      <div className="team-card-inner">
        <div className="team-image-wrapper team-image-wrapper--skeleton">
          <span className="team-skeleton team-skeleton-media" />
        </div>
        <div className="team-content">
          <div className="team-header">
            <span className="team-skeleton team-skeleton-name" />
            <span className="team-skeleton team-skeleton-role" />
          </div>
          <span className="team-skeleton team-skeleton-bio" />
          <span className="team-skeleton team-skeleton-bio team-skeleton-bio--short" />
          <div className="team-footer">
            <span className="team-skeleton team-skeleton-handle" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTeamLoading, setIsTeamLoading] = useState(!teamCache.members);
  const [members, setMembers] = useState(teamCache.members || []);

  useEffect(() => {
    let isMounted = true;

    prefetchTeam()
      .then((list) => {
        if (!isMounted) return;
        setMembers(list);
      })
      .catch((e) => {
        console.error("Failed to load teams:", e.message);
        if (isMounted) setMembers([]);
      })
      .finally(() => {
        if (isMounted) setIsTeamLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      toast.warning("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = `${API_BASE}/api/team/enroll`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        console.error(`Enroll API returned ${response.status}`);
        const errorText = await response.text();
        let errorMessage = "Something went wrong";

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }

        toast.error(errorMessage);
        return;
      }

      await response.json();
      toast.success("Email sent successfully!");
      setEmail("");
    } catch (error) {
      console.error("Fetch failed:", error);
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
          <SEO
        title="Team | Meet Nexlume Developers & Designers"
        description="Meet the Nexlume team of developers, designers, product thinkers, and creators building websites, apps, and digital products."
        canonical="/team"
        keywords="Nexlume team, web development team, app development team, UI UX designers"
      />
      <section id="team" className="team-body">
        <div className="team-hero">
          <div className="team-hero-badge">Our Team</div>
          <h1 className="team-hero-title">
            Meet The Visionaries <br />
            <span className="gradient-text">Behind NexLume</span>
          </h1>
          <p className="team-hero-description">
            A passionate collective of creators, developers, and innovators
            dedicated to transforming ideas into extraordinary digital
            experiences.
          </p>
        </div>

        <div className="team-stats">
          <div className="stat-item">
            <div className="stat-number">{members.length}</div>
            <div className="stat-label">Team Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>

        <div id="teams" className="team-main-container">
          <div className="team-grid team-grid--four">
            {isTeamLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <TeamMemberSkeleton key={`skeleton-${index}`} />
                ))
              : members.map((member, index) => (
                  <TeamMemberCard
                    key={member._id || index}
                    member={member}
                    priority={index < 2}
                  />
                ))}
          </div>
        </div>
      </section>

      <section className="about-us-section">
        <div className="about-us-container">
          <div className="about-us-intro">
            <div className="about-us-badge">About Us</div>
            <h2 className="about-us-title">
              Building the <span className="gradient-text">Future</span> of
              Digital Innovation
            </h2>
            <p className="about-us-description">
              At NexLume, we're more than just a team — we're a family of
              passionate innovators committed to pushing the boundaries of
              what's possible in the digital world. Founded with a vision to
              transform ideas into reality, we combine cutting-edge technology
              with creative excellence to deliver exceptional solutions.
            </p>
            <p className="about-us-description">
              Our journey began with a simple belief: that great software should
              not only solve problems but should inspire and delight users.
              Today, we've helped countless businesses bring their visions to
              life through custom web applications, mobile solutions, and
              stunning digital experiences.
            </p>
          </div>

          <div className="about-us-values">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <div className="value-item-content">
                <h3>Mission-Driven</h3>
                <p>
                  Empowering businesses through innovative digital solutions
                </p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">💡</div>
              <div className="value-item-content">
                <h3>Innovation First</h3>
                <p>
                  Embracing cutting-edge technologies and creative approaches
                </p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <div className="value-item-content">
                <h3>Client-Centric</h3>
                <p>Your success is our success, always</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <div className="value-item-content">
                <h3>Product-Based</h3>
                <p>
                  Building scalable products that solve real problems and grow
                  with your users
                </p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">🎨</div>
              <div className="value-item-content">
                <h3>Design-Led</h3>
                <p>
                  Crafting bold, intuitive experiences where aesthetics meet
                  usability
                </p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">📈</div>
              <div className="value-item-content">
                <h3>Built to Scale</h3>
                <p>
                  Engineering architecture that grows seamlessly with your
                  ambitions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="join-team"
        style={{ backgroundImage: `url(${TeamEmailImage})` }}
      >
        <div className="join-container">
          <h2 className="join-title">Join Our Growing Team</h2>
          <p className="join-subtitle">
            Be part of something extraordinary. We're always looking for
            talented individuals who share our passion for innovation.
          </p>
          <div className="form-container">
            <input
              type="email"
              placeholder="Enter your email address"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="apply-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Join Us
                  <svg
                    className="button-arrow"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4 10h12M12 6l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
          <p className="contact-info">
            Or reach out directly at{" "}
            <Link to="mailto:nexlume.co@gmail.com" className="contact-link">
              nexlume.co@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Team;
