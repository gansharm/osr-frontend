import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  FiStar,
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
  { name: "Reviews ⭐", id: "reviews", icon: FiStar },
  { name: "Contact", id: "contact", icon: FiPhone },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const navRef = useRef(null);
  const lastTouchActivationRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
      return undefined;
    }

    const timeout = window.setTimeout(() => setMenuMounted(false), 360);
    return () => window.clearTimeout(timeout);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  // set CSS variables for mobile menu top offset based on nav height
  useEffect(() => {
    const setOffsets = () => {
      const h = navRef.current?.offsetHeight || 72;
      document.documentElement.style.setProperty("--nav-top", `${h + 8}px`);
      document.documentElement.style.setProperty("--nav-top-sm", `${Math.max(56, h - 8)}px`);
    };
    setOffsets();
    window.addEventListener("resize", setOffsets);
    return () => window.removeEventListener("resize", setOffsets);
  }, []);

  // close on Escape key for mobile accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigation = (sectionId) => {
    const scrollDelay = menuOpen ? 420 : 0;

    setMenuOpen(false);

    if (sectionId === "Products") {
      navigate("/services");
      return;
    }

    if (sectionId === "reviews") {
      navigate("/reviews");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => scrollToSection(sectionId), Math.max(scrollDelay, 260));
    } else {
      window.setTimeout(() => scrollToSection(sectionId), scrollDelay);
    }
  };

  const handleTouchNavigation = (sectionId, event) => {
    if (event.pointerType === "mouse") return;

    const now = Date.now();
    if (lastTouchActivationRef.current && now - lastTouchActivationRef.current < 500) {
      event.preventDefault();
      return;
    }

    lastTouchActivationRef.current = now;
    event.preventDefault();
    handleNavigation(sectionId);
  };

  const handleClickNavigation = (sectionId) => {
    if (lastTouchActivationRef.current && Date.now() - lastTouchActivationRef.current < 500) return;
    handleNavigation(sectionId);
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
    if (item.id === "reviews") {
      return location.pathname === "/reviews";
    }
    if (item.id === "home") {
      return location.pathname === "/";
    }
    return false;
  };

  const mobileMenu = (
    <div
      id="mobile-navigation"
      className={`mobile-menu ${menuOpen ? "show" : ""}`}
      aria-hidden={!menuOpen}
    >
      <div className="mobile-menu-head">
        <img src={logo} alt="OSR Solutions" />
        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
          <HiX />
        </button>
      </div>

      <div className="mobile-menu-links">
        {NAV_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              type="button"
              key={item.id}
              className={isActive(item) ? "active" : ""}
              onPointerUp={(event) => handleTouchNavigation(item.id, event)}
              onClick={() => handleClickNavigation(item.id)}
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
          <button
            type="button"
            onPointerUp={(event) => handleTouchNavigation("contact", event)}
            onClick={() => handleClickNavigation("contact")}
          >
            Get a Quote
            <FiArrowRight />
          </button>
        </div>
      </div>

      <div className="menu-contact">
        <button type="button" onClick={callOffice}>
          <FiPhone />
          <span>{company.phone}</span>
        </button>
        <a href={`mailto:${company.email}`}>
          <FiMail />
          <span>{company.email}</span>
        </a>
        <button type="button" onClick={openWhatsApp}>
          <FaWhatsapp />
          <span>WhatsApp Us</span>
        </button>
      </div>

      <div className="mobile-menu-product">
        <FiGrid />
        <span>Premium industrial printing solutions, spare parts and technical support.</span>
      </div>
    </div>
  );

  return (
    <>
      <nav className="nav" aria-label="Primary navigation" ref={navRef}>
        <button
          type="button"
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
                type="button"
                className={isActive(item) ? "active" : ""}
                onClick={() => handleNavigation(item.id)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button type="button" className="nav-call" onClick={callOffice} aria-label="Call OSR Solutions">
            <FiPhone />
          </button>
          <button type="button" className="quote-btn" onClick={getQuote}>
            Get a Quote
            <FiArrowRight />
          </button>
          <button
            type="button"
            className="hamburger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {(menuOpen || menuMounted) &&
        (typeof document !== "undefined" ? createPortal(mobileMenu, document.body) : mobileMenu)}
    </>
  );
}

export default Navbar;
