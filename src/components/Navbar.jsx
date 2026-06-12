import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiBox,
  FiBriefcase,
  FiGrid,
  FiHome,
  FiImage,
  FiMail,
  FiPhone,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { company } from "../data/siteData";
import "./Navbar.css";
import logo from "../images/OSR.png";

const NAV_LINKS = [
  { name: "Home", id: "home", icon: FiHome },
  { name: "About", id: "about", icon: FiUser },
  { name: "Services", id: "services", icon: FiSettings },
  { name: "Products", id: "Products", icon: FiBox },
  { name: "Gallery", id: "gallery", icon: FiImage },
  { name: "Contact", id: "contact", icon: FiPhone },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigation = (sectionId) => {
    if (sectionId === "Products") {
      navigate("/services");
      setMenuOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 220);
    } else {
      scrollToSection(sectionId);
    }

    setMenuOpen(false);
  };

  const getQuote = () => handleNavigation("contact");

  const callOffice = () => {
    window.location.href = `tel:${company.phone}`;
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/91${company.phone.replace(/\D/g, "").slice(-10)}`, "_blank");
  };

  const isActive = (item) => {
    if (item.id === "Products") {
      return location.pathname.startsWith("/services") || location.pathname.startsWith("/products");
    }
    if (item.id === "home") {
      return location.pathname === "/";
    }
    return false;
  };

  return (
    <nav className="nav" aria-label="Primary navigation">
      <button
        className="nav-brand"
        onClick={() => navigate("/")}
        aria-label="Go to home"
      >
        <img src={logo} alt="OSR Solutions" className="nav-logo" />
      </button>

      <ul className="nav-links">
        {NAV_LINKS.map((item) => (
          <li key={item.id}>
            <button
              className={isActive(item) ? "active" : ""}
              onClick={() => handleNavigation(item.id)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <button className="nav-call" onClick={callOffice} aria-label="Call OSR Solutions">
          <FiPhone />
        </button>
        <button className="quote-btn" onClick={getQuote}>
          Get a Quote
          <FiArrowRight />
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-head">
          <img src={logo} alt="OSR Solutions" />
          <button onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
            <HiX />
          </button>
        </div>

        <div className="mobile-menu-links">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={isActive(item) ? "active" : ""}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="menu-quote">
          <FiBriefcase />
          <div>
            <h3>Need a Quote?</h3>
            <p>Get the best solution for your business. Our experts are here to help you.</p>
            <button onClick={getQuote}>
              Get a Quote
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="menu-contact">
          <button onClick={callOffice}>
            <FiPhone />
            <span>{company.phone}</span>
          </button>
          <a href={`mailto:${company.email}`}>
            <FiMail />
            <span>{company.email}</span>
          </a>
          <button onClick={openWhatsApp}>
            <FaWhatsapp />
            <span>WhatsApp Us</span>
          </button>
        </div>

        <div className="mobile-menu-product">
          <FiGrid />
          <span>Premium industrial printing solutions, spare parts and technical support.</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
