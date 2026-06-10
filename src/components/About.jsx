import "./About.css";

const FEATURES = [
  {
    icon: "🖨️",
    title: "Industrial Machines",
    desc: "High-performance printing solutions for businesses.",
  },
  {
    icon: "🛠️",
    title: "Machine Servicing",
    desc: "Expert repair and maintenance support.",
  },
  {
    icon: "⚙️",
    title: "Genuine Spare Parts",
    desc: "Premium quality spare parts for long-term performance.",
  },
  {
    icon: "🚀",
    title: "Technical Support",
    desc: "Fast and reliable support for machine operations.",
  },
];

const ABOUT_CARDS = [
  {
    num: "500+",
    label: "Machines Installed",
  },
  {
    num: "1000+",
    label: "Happy Clients",
  },
  {
    num: "24/7",
    label: "Technical Support",
  },
  {
    num: "10+",
    label: "Years Experience",
  },
];

function About() {
  return (
    <section id="about" className="sec about-bg">
      <div className="about-grid">

        {/* LEFT CONTENT */}
        <div className="about-content reveal">
          {/* <span className="sec-tag">// About OSR</span> */}

          <h2>
            Industrial Printing <br />
            <span className="glow">
              Solutions Experts
            </span>
          </h2>

          <p className="about-text">
            OSR Solutions specializes in
            advanced industrial printing machines,
            technical support, machine servicing,
            installation, and genuine spare parts.
          </p>

          <p className="about-text">
            With years of expertise, we help businesses
            achieve high-quality, efficient, and reliable
            printing solutions through premium technology
            and expert guidance.
          </p>

          <div className="feat-list">
            {FEATURES.map((f) => (
              <div className="feat" key={f.title}>
                <div className="feat-icon">
                  {f.icon}
                </div>

                <div>
                  <div className="feat-title">
                    {f.title}
                  </div>

                  <div className="feat-desc">
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="about-cards reveal">
          {ABOUT_CARDS.map((c) => (
            <div
              className="about-card"
              key={c.label}
            >
              <h1 className="about-num">
                {c.num}
              </h1>

              <p className="about-lbl">
                {c.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;