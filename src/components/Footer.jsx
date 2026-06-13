import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { company, products } from "../data/siteData";
import "./Footer.css";
import logo from "../images/OSR.png";

const FOOTER_LINKS = {
  home: { path: "/", sectionId: "home" },
  about: { path: "/about", sectionId: "about" },
  services: { path: "/services", sectionId: "services" },
  products: { path: "/products" },
  gallery: { path: "/gallery", sectionId: "gallery" },
  reviews: { path: "/reviews" },
  contact: { path: "/contact", sectionId: "contact" },
};

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (linkKey) => {
    const target = FOOTER_LINKS[linkKey];
    if (!target) return;

    const pathChanged = normalizePath(location.pathname) !== normalizePath(target.path);

    navigate(target.path);

    if (target.sectionId) {
      setTimeout(
        () => document.getElementById(target.sectionId)?.scrollIntoView({ behavior: "smooth" }),
        pathChanged ? 260 : 0
      );
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
