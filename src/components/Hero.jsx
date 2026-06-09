import "./Hero.css";
    import printerImg from "../images/flex3.png";
import { useNavigate } from "react-router-dom";
const STATS = [
  {
    icon: "⚙️",
    num: "500+",
    label: "Machines Repaired",
  },
  {
    icon: "📦",
    num: "1000+",
    label: "Parts Delivered",
  },
  {
    icon: "🏅",
    num: "5+",
    label: "Years Experience",
  },
];

const HEX_ITEMS = [
  { icon: "⚙️", text: "MAIN BOARDS" },
  { icon: "🖨️", text: "INK HEADS" },
  { icon: "🧩", text: "MOTHERBOARD REPAIR" },
  { icon: "🔧", text: "SPARE PARTS" },
  { icon: "🎧", text: "TECHNICAL SUPPORT" },
  { icon: "⚡", text: "FAST SOLUTIONS" },
];

function Hero({ setActive }) {
    const navigate = useNavigate();
  return (
    <section id="home" className="hero">

      {/* BACKGROUND MACHINE IMAGE */}
      <div className="hero-machine-bg">
        <img
    src={printerImg}
    alt="Printer Machine"
  />
      </div>

      {/* Glow orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />

      <div className="hero-grid">

        {/* LEFT SIDE */}
        <div className="hero-content reveal">

           

          <h1 className="hero-h1">
            Machine Parts
            <br />
            & Repair
            <br />
            <span className="glow">
              Solutions
            </span>
          </h1>

          <p className="hero-desc">
            OSR Solutions is your trusted partner for industrial printing machines, offering sales, service, installation, repair, technical support, and genuine spare parts including print heads, main boards, head boards, cables, and more.
          </p>

          <div className="ctas">
            <button
  className="btn-primary"
  onClick={() =>
    navigate("/services")
  }
>
  EXPLORE SERVICES →
</button>

            <button
  className="btn-outline"
  onClick={() => {

    // If already on homepage
    if (
      window.location
        .pathname === "/"
    ) {

      document
        .getElementById(
          "contact"
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        });

    } else {

      // From service page go to home contact
      window.location.href =
        "/#contact";
    }
  }}
>
  GET IN TOUCH
</button>
          </div>

          <div className="hero-stats">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="stat-card"
              >
                <div className="stat-icon">
                  {s.icon}
                </div>

                <div className="stat-num">
                  {s.num}
                </div>

                <div className="stat-label">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE HEX */}
        <div className="hex-grid">
          {HEX_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`hex hex-${i}`}
            >
              <div className="hex-icon">
                {item.icon}
              </div>

              <span>
                {item.text}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Hero;