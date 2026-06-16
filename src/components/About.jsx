import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiCpu,
  FiHeadphones,
  FiMapPin,
  FiPrinter,
  FiSettings,
  FiTool,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { aboutFeatures } from "../data/siteData";
import HowWeWork from "./HowWeWork";
import "./About.css";
import "./Hero.css";
// Use the KJ-1060 machine image from the images folder
import aboutMachine from "../images/KJ-1060.png";

const WHY_OSR_CARDS = [
  {
    title: "Premium Quality Machines",
    desc: "We supply advanced DTF, UV DTF, UV Flatbed and Eco Solvent machines designed for performance, reliability and long-term productivity.",
    icon: FiAward,
  },
  {
    title: "Expert Installation & Training",
    desc: "Our experienced team provides complete machine installation, setup and operator training to ensure smooth operations from day one.",
    icon: FiTool,
  },
  {
    title: "Reliable After-Sales Support",
    desc: "From technical assistance to spare parts availability, our support team is always ready to help keep your business running.",
    icon: FiHeadphones,
  },
  {
    title: "Pan India Service Network",
    desc: "Serving customers across India with fast response times, remote assistance and on-site service support.",
    icon: FiMapPin,
  },
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

        <div className="why-osr reveal">
          <div className="section-heading why-osr-head">
            <h2>
              Why Businesses Choose <span>OSR Solutions</span>
            </h2>
            <p className="sec-sub">
              Trusted by print businesses across India for reliable machines, expert guidance and
              long-term support.
            </p>
          </div>

          <div className="why-osr-grid">
            {WHY_OSR_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article className="why-osr-card" key={card.title}>
                  <div className="why-osr-icon">
                    <Icon />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </article>
              );
            })}
          </div>

          <div className="why-osr-banner">
            <div>
              <h3>Your Printing Success Partner</h3>
              <p>
                At OSR Solutions, we don't just sell machines. We help businesses grow with the
                right technology, training and ongoing support.
              </p>
            </div>
            <button className="btn-primary why-osr-cta" onClick={() => navigate("/products")}>
              Explore Our Products
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
