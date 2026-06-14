import React from "react";
import "./Footer.css";
import logoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { OptimizedImage } from "../../components/OptimizedImage";

const socialLinks = [
  {
    id: "linkedin",
    href: "https://linkedin.com/in/nexlume-co-463256384/?skipRedirect=true",
    label: "LinkedIn",
    icon: "bi-linkedin",
  },
  {
    id: "github",
    href: "https://github.com/Nex-Lume",
    label: "GitHub",
    icon: "bi-github",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/nexlume/",
    label: "Instagram",
    icon: "bi-instagram",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <Link to="/" className="footer-logo-link" aria-label="Go to Nexlume homepage">
            <div className="footer-brand">
              <OptimizedImage
                src={logoImage}
                alt="Nexlume logo"
                className="footer-logo"
                priority
                generateSources={false}
              />
            </div>
          </Link>

          <div className="footer-social">
            <p className="follow-us">Follow Us</p>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Nexlume on ${link.label}`}
                >
                  <i className={`bi ${link.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <div className="contact-email">
            <a href="mailto:nexlume.co@gmail.com">nexlume.co@gmail.com</a>
          </div>
          <span className="copyright">
            Nexlume &copy; 2026 All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
