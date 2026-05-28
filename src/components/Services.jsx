import "./Services.css";

const SERVICES = [
  {
    icon: "🖨️",
    title: "Printing Machines",
    desc: "High-performance industrial printing machines with advanced technology.",
    tag: "Premium Quality",
  },
  {
    icon: "🛠️",
    title: "Machine Repair",
    desc: "Fast and reliable machine repair with expert technicians.",
    tag: "24/7 Support",
  },
  {
    icon: "⚙️",
    title: "Spare Parts",
    desc: "Original spare parts to maintain long-term performance.",
    tag: "Genuine Parts",
  },
  {
    icon: "🚀",
    title: "Installation",
    desc: "Professional installation and setup for smooth operations.",
    tag: "Fast Setup",
  },
  {
    icon: "🔧",
    title: "Technical Support",
    desc: "Complete troubleshooting and maintenance support.",
    tag: "Expert Team",
  },
  {
    icon: "🎯",
    title: "Consultation",
    desc: "Get expert advice for choosing the best machine solution.",
    tag: "Business Growth",
  },
];

function Services() {
  return (
    <section
      id="services"
      className="sec svc-bg"
    >
      <div className="svc-head reveal">
        {/* <span className="sec-tag">
          // Our Services
        </span> */}

        <h2>
          Complete Printing
          <span className="glow">
            {" "}Solutions
          </span>
        </h2>

        <p className="sec-sub">
          We provide premium industrial
          printing machines, installation,
          servicing, technical support,
          and genuine spare parts for
          seamless business operations.
        </p>
      </div>

      <div className="svc-grid">
        {SERVICES.map((s) => (
          <div
            className="svc-card reveal"
            key={s.title}
          >
            <div className="svc-icon">
              {s.icon}
            </div>

            <div className="svc-title">
              {s.title}
            </div>

            <div className="svc-desc">
              {s.desc}
            </div>

            <span className="svc-tag">
              {s.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;