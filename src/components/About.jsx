import {
  FiArrowRight,
  FiCheckCircle,
  FiCpu,
  FiHeadphones,
  FiPrinter,
  FiSettings,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { aboutFeatures } from "../data/siteData";
import HowWeWork from "./HowWeWork";
import "./About.css";
import "./Hero.css";
// Use the KJ-1060 machine image from the images folder
import aboutMachine from "../images/KJ-1060.png";

const ABOUT_CARDS = [
  { num: "500+", label: "Machines Installed" },
  { num: "1000+", label: "Happy Clients" },
  { num: "24/7", label: "Technical Support" },
  { num: "10+", label: "Years Experience" },
];

const featureIcons = [FiPrinter, FiSettings, FiCpu, FiHeadphones];

function About() {
  const navigate = useNavigate();

  return (
    <section id="about" className="about-bg">
      <div className="about-shell">
        <div className="about-grid">
            <div className="about-visual reveal">
            <div className="about-machine">
              <div className="showcase-stage">
                <img src={aboutMachine} alt="UV flatbed printing machine" />
                <span className="stage-orb stage-orb-one" aria-hidden="true"></span>
                <span className="stage-orb stage-orb-two" aria-hidden="true"></span>
                <span className="stage-orb stage-orb-three" aria-hidden="true"></span>
              </div>
            </div>
            <div className="about-mini-grid">
              {ABOUT_CARDS.map((card) => (
                <div className="about-card" key={card.label}>
                  <strong>{card.num}</strong>
                  <span>{card.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-content reveal">
            <span className="eyebrow">About Us</span>
            <h2>
              Innovation. Quality.
              <span>Performance.</span>
            </h2>
            <p className="about-text">
              OSR Solutions specializes in advanced industrial printing machines, technical support,
              machine servicing, installation, and genuine spare parts.
            </p>
            <p className="about-text">
              With years of expertise, we help businesses achieve high-quality, efficient, and
              reliable printing solutions through premium technology and expert guidance.
            </p>

            <div className="feat-list">
              {aboutFeatures.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <div className="feat" key={feature.title}>
                    <div className="feat-icon">
                      <Icon />
                    </div>
                    <div>
                      <div className="feat-title">{feature.title}</div>
                      <div className="feat-desc">{feature.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="about-checks">
              {[
                "Genuine & High Quality Spare Parts",
                "Expert Technicians & Fast Service",
                "Installation & Operator Training",
                "Affordable Solutions",
                "Pan India Service Network",
              ].map((item) => (
                <span key={item}>
                  <FiCheckCircle />
                  {item}
                </span>
              ))}
            </div>

            <button className="btn-outline" onClick={() => navigate("/services")}>
              Know More About Us
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
      <HowWeWork />
    </section>
  );
}

export default About;
