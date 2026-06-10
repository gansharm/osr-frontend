import "./Footer.css";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    if (sectionId === "products") {
      navigate("/services");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 300);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-about">
          <h2 className="footer-logo">
            O<span>SR</span>
          </h2>

          <p className="footer-tag">
            OSR SOLUTIONS
          </p>

          <p className="footer-desc">
            Professional supplier of BYHX Main Boards,
            Ink Heads, Motherboard Repair,
            Spare Parts and Technical Support.
          </p>

          <div className="footer-socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-box"
            >
              f
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-box"
            >
              ◎
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-box"
            >
              in
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-box"
            >
              𝕏
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>

          <ul>
            <li onClick={() => handleNavigation("home")}>
              Home
            </li>

            <li onClick={() => handleNavigation("about")}>
              About
            </li>

            <li onClick={() => handleNavigation("services")}>
              Services
            </li>

            <li onClick={() => handleNavigation("products")}>
              Products
            </li>

            <li onClick={() => handleNavigation("contact")}>
              Contact
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-col">
          <h3>Services</h3>

          <ul>
            <li>Main Boards</li>
            <li>Ink Heads</li>
            <li>Motherboard Repair</li>
            <li>Technical Support</li>
            <li>Spare Parts</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact Info</h3>

          <ul>
            <li>
              📍 Head Office - First Floor, Room no US - 14,
              US COMPLEX, 120 Mathura Road,
              Opp Apollo Hospital, Jasola Vihar,
              New Delhi
            </li>

            <li>
              📍Guwahati Branch - Santi Basti, Amsing Jorabat,
              (Narangi Army Cantt),
              Guwahati - 781027 ASSAM
            </li>

            <li>
              📞 +91 9211566451,
              +91 9717125351,
              +91 9085184086
            </li>

            <li>
              📧 osrsolutions51@gmail.com
            </li>

            <li>
              🕒 Mon - Sat / 10 AM - 6 PM
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © 2025 OSR Solutions.
          All Rights Reserved.
        </p>

        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Sitemap</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;