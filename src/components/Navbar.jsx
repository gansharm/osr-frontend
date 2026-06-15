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
  FiMoon,
  FiPhone,
  FiSettings,
  FiStar,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { company } from "../data/siteData";
import "./Navbar.css";
import logoLight from "../images/OSR-logo-transparent.png";
import logoDark from "../images/OSR White1.png";

const NAV_LINKS = [
  { name: "Home", id: "home", path: "/", sectionId: "home", icon: FiHome },
  { name: "About Us", id: "about", path: "/about", sectionId: "about", icon: FiUser },
  { name: "Products", id: "products", path: "/products", icon: FiBox },
  { name: "Services", id: "services", path: "/services", sectionId: "services", icon: FiSettings },
  { name: "Gallery", id: "gallery", path: "/gallery", sectionId: "gallery", icon: FiImage },
  { name: "Contact Us", id: "contact", path: "/contact", sectionId: "contact", icon: FiPhone },
  { name: "Reviews", id: "reviews", path: "/reviews", icon: FiStar },
];

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";
const THEME_STORAGE_KEY = "osr-theme";

const readStoredTheme = () => {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
};

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof document === "undefined") return false;

    return (
      document.documentElement.classList.contains("dark") ||
      readStoredTheme() === "dark"
    );
  });
  const navRef = useRef(null);
  const lastTouchActivationRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = normalizePath(location.pathname);
  const activeLogo = darkMode ? logoDark : logoLight;

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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, darkMode ? "dark" : "light");
    } catch (error) {
      // localStorage can be unavailable in private or restricted contexts.
    }
  }, [darkMode]);

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

  const getNavItem = (itemOrId) =>
    typeof itemOrId === "string" ? NAV_LINKS.find((item) => item.id === itemOrId) : itemOrId;

  const handleNavigation = (itemOrId) => {
    const item = getNavItem(itemOrId);
    if (!item) return;

    const scrollDelay = menuOpen ? 420 : 0;
    const pathChanged = currentPath !== normalizePath(item.path);

    setMenuOpen(false);
    navigate(item.path);

    if (item.sectionId) {
      window.setTimeout(
        () => scrollToSection(item.sectionId),
        pathChanged ? Math.max(scrollDelay, 260) : scrollDelay
      );
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
    if (item.id === "products") {
      return currentPath === "/products" || currentPath.startsWith("/products/");
    }

    return currentPath === normalizePath(item.path);
  };

  const mobileMenu = (
    <div
      id="mobile-navigation"
      className={`mobile-menu ${menuOpen ? "show" : ""}`}
      aria-hidden={!menuOpen}
    >
      <div className="mobile-menu-head">
        <img key={`mobile-${activeLogo}`} src={activeLogo} alt="OSR Solutions" />
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
              className={`${isActive(item) ? "active" : ""} ${
                item.id === "reviews" ? "reviews-mobile-btn" : ""
              }`}
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
          <img key={`nav-${activeLogo}`} src={activeLogo} alt="OSR Solutions" className="nav-logo" />
        </button>

        <ul className="nav-links">
          {NAV_LINKS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`${isActive(item) ? "active" : ""} ${
                  item.id === "reviews" ? "reviews-nav-btn" : ""
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                {item.id === "reviews" ? (
                  <>
                    <FiStar />
                    <span>{item.name}</span>
                  </>
                ) : (
                  item.name
                )}
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
            className="theme-toggle"
            onClick={() => setDarkMode((enabled) => !enabled)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={darkMode}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FiMoon /> : <FiSun />}
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
