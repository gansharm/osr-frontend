import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiAward,
  FiBox,
  FiCheckCircle,
  FiCpu,
  FiPrinter,
  FiShield,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import { heroHighlights, products, stats } from "../data/siteData";
import "./Hero.css";

const statIcons = [FiPrinter, FiBox, FiAward, FiUsers];
const highlightIcons = [FiCpu, FiTool, FiBox, FiShield];

function Hero() {
  const navigate = useNavigate();
  const heroProduct = products.find((product) => product.slug === "kj-1060uc-uv-flatbed-printer");

  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-shell">
        <div className="hero-grid">
          <div className="hero-content reveal">
            <span className="eyebrow">Machine Parts & Repair Solutions</span>
            <h1 className="hero-h1">
              Industrial Printing
              <span>Solutions Experts</span>
            </h1>
            <p className="hero-kicker">
              UV Printers <span /> DTF Printers <span /> Spare Parts <span /> Service & Support
            </p>
            <p className="hero-desc">
              OSR Solutions is your trusted partner for industrial printing machines, offering sales,
              service, installation, repair, technical support, and genuine spare parts including print
              heads, main boards, head boards, cables, and more.
            </p>

            <div className="ctas">
              <button className="btn-primary" onClick={() => navigate("/services")}>
                Explore Products
                <FiArrowRight />
              </button>
              <button className="btn-outline" onClick={goToContact}>
                Get a Quote
                <FiArrowRight />
              </button>
            </div>

            <div className="customer-proof" aria-label="Customer rating">
              <div className="avatar-stack">
                <span>OS</span>
                <span>BY</span>
                <span>UV</span>
                <span>DT</span>
              </div>
              <div>
                <strong>500+ Happy Customers</strong>
                <div className="stars">*****</div>
              </div>
            </div>
          </div>

          <div className="hero-showcase reveal">
            <div className="showcase-stage">
              <img src={heroProduct.image} alt={heroProduct.title} />
            </div>

            <div className="showcase-features">
              {heroHighlights.map((item, index) => {
                const Icon = highlightIcons[index];
                return (
                  <div className="showcase-feature" key={item.title}>
                    <Icon />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hero-stats">
          {stats.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <div className="stat-card" key={stat.label}>
                <Icon />
                <div>
                  <strong>{stat.num}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hero-feature-rail">
          {heroHighlights.map((item, index) => {
            const Icon = highlightIcons[index];
            return (
              <div key={item.title} className="rail-item">
                <Icon />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
                <FiCheckCircle />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;
