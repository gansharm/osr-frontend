import {
  FiArrowRight,
  FiHeadphones,
  FiMessageCircle,
  FiSettings,
  FiTool,
} from "react-icons/fi";
import "./HowWeWork.css";

const PROCESS_STEPS = [
  {
    number: "01.",
    title: "Consultation",
    text: "Understand your requirements",
    icon: FiMessageCircle,
  },
  {
    number: "02.",
    title: "Recommendation",
    text: "We suggest the best solution",
    icon: FiSettings,
  },
  {
    number: "03.",
    title: "Installation",
    text: "Professional installation & training",
    icon: FiTool,
  },
  {
    number: "04.",
    title: "Support",
    text: "Ongoing support & maintenance",
    icon: FiHeadphones,
  },
];

function HowWeWork() {
  const getStarted = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="work-process">
      <div className="work-process-shell">
        <div className="work-process-head reveal">
          <span className="eyebrow">Our Work Process</span>
          <h2>How We Work</h2>
        </div>

        <div className="process-timeline" aria-label="OSR Solutions work process">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <article className="process-step reveal" key={step.title}>
                <div className="process-icon" aria-hidden="true">
                  <Icon />
                </div>

                <div className="process-card">
                  <h3>
                    <span>{step.number}</span>
                    {step.title}
                  </h3>
                  <p>{step.text}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="work-process-action reveal">
          <button className="btn-primary" type="button" onClick={getStarted}>
            Get Started Today
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowWeWork;
