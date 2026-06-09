import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from
"../images/OSR6.png";
const NAV_LINKS = [
  {
    name: "Home",
    id: "home",
  },
  {
    name: "About",
    id: "about",
  },
  {
    name: "Services",
    id: "services",
  },
  {
    name: "Contact",
    id: "contact",
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (
  sectionId
) => {

  // If not on homepage
  if (
    location.pathname !== "/"
  ) {

    navigate("/");

    setTimeout(() => {
      document
        .getElementById(
          sectionId
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        });
    }, 200);

  } else {

    // homepage scroll
    document
      .getElementById(
        sectionId
      )
      ?.scrollIntoView({
        behavior:
          "smooth",
      });
  }

  setMenuOpen(false);
};

  return (
    <nav className="nav">

      {/* LOGO */}
      <div
        className="nav-logo"
        onClick={() =>
          navigate("/")
        }
      >
        <div className="logo">
  <img
    src={logo}
    alt="OSR Solutions"
    className="nav-logo"
  />
</div>
      </div>

      

      {/* DESKTOP MENU */}
      <ul className="nav-links">
        {NAV_LINKS.map(
          (item) => (
            <li key={item.id}>
              <button
                onClick={() =>
                  handleNavigation(
                    item.id
                  )
                }
              >
                {item.name}
              </button>
            </li>
          )
        )}
      </ul>


        

      {/* HAMBURGER */}
      <button
        className="hamburger"
        onClick={() =>
          setMenuOpen(
            !menuOpen
          )
        }
      >
        {menuOpen ? (
          <HiX />
        ) : (
          <HiMenuAlt3 />
        )}
      </button>

      {/* MOBILE MENU */}
      <div
        className={`mobile-menu ${
          menuOpen
            ? "show"
            : ""
        }`}
      >
        {NAV_LINKS.map(
          (item) => (
            <button
              key={item.id}
              onClick={() =>
                handleNavigation(
                  item.id
                )
              }
            >
              {item.name}
            </button>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;