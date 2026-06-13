import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { company, products } from "../data/siteData";
import "./Footer.css";
import logo from "../images/OSR.png";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    if (sectionId === "products") {
      navigate("/services");
      return;
    }

    if (sectionId === "reviews") {
      navigate("/reviews");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 260);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/91${company.phone.replace(/\D/g, "").slice(-10)}`, "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <img src={logo} alt="OSR Solutions" className="footer-logo-img" />
          <p className="footer-desc">
            Professional supplier of BYHX Main Boards, Ink Heads, Motherboard Repair, Spare Parts
            and Technical Support.
          </p>

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => handleNavigation("home")}>Home</li>
            <li onClick={() => handleNavigation("about")}>About Us</li>
            <li onClick={() => handleNavigation("services")}>Services</li>
            <li onClick={() => handleNavigation("products")}>Products</li>
            <li onClick={() => handleNavigation("gallery")}>Gallery</li>
            <li onClick={() => handleNavigation("reviews")}>Customer Reviews ⭐</li>
            <li onClick={() => handleNavigation("contact")}>Contact Us</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Our Products</h3>
          <ul>
            {products.slice(0, 6).map((product) => (
              <li key={product.slug} onClick={() => navigate(`/products/${product.slug}`)}>
                {product.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Our Services</h3>
          <ul>
            <li>Installation</li>
            <li>Repair & Maintenance</li>
            <li>Spare Parts Supply</li>
            <li>Technical Support</li>
            <li>Training</li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <FiPhoneCall />
              <span>
                {company.phone}
                <br />
                {company.phoneAlt}
                <br />
                {company.branchPhone}
              </span>
            </li>
            <li>
              <FiMail />
              <span>{company.email}</span>
            </li>
            <li>
              <FiMapPin />
              <span>
                {company.footerOffice}
                <br />
                Guwahati Branch - {company.branch}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 OSR Solutions. All Rights Reserved.</p>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Sitemap</span>
        </div>
      </div>

      <button className="whatsapp-float" onClick={openWhatsApp} aria-label="WhatsApp OSR Solutions">
        <FaWhatsapp />
      </button>
    </footer>
  );
}

export default Footer;
