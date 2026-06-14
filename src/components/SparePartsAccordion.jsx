import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import "./SparePartsAccordion.css";

function SparePartsAccordion({ parts }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`spare-parts-accordion ${isOpen ? "open" : ""}`}>
      <button
        className="spare-parts-trigger"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span>Spare Parts</span>
        <span className="spare-parts-icon" aria-hidden="true">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </span>
      </button>

      <div className="spare-parts-panel" aria-hidden={!isOpen}>
        <div className="spare-parts-inner">
          <div className="spare-parts-grid">
            {parts.map((part, index) => (
              <figure
                className="spare-part-card"
                key={part.name}
                style={{ "--item-index": index }}
              >
                <div className="spare-part-image">
                  <img src={part.image} alt={part.name} />
                </div>
                <figcaption>{part.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SparePartsAccordion;
