import React from "react";
import "./Footer.css";
import logoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { OptimizedImage } from "../../components/OptimizedImage";

const Footer = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <Link to="/" className="footer-logo-link">
              <OptimizedImage
                src={logoImage}
                alt="Nexlume"
                className="footer-logo"
                priority
                generateSources={false}
              />
            </Link>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="social-links-container">
              <div className="follow-us mb-4 ">Follow Us</div>
              <div className="social-links">
                <a
                  href="https://linkedin.com/in/nexlume-co-463256384/?skipRedirect=true"
                  className="social-link linkedin-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://github.com/Nex-Lume"
                  className="social-link Github-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="https://www.instagram.com/nexlume/"
                  className="social-link Instagram-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <div className="contact-email">
              <a href="mailto:nexlume.co@gmail.com">nexlume.co@gmail.com</a>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="copyright">
              Nexlume &copy; 2026 All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
