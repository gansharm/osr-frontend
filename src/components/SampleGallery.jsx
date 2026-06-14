import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import "./SampleGallery.css";

function SampleGallery({ samples, gridClassName, cardClassName = "" }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeSample = activeIndex === null ? null : samples[activeIndex];

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null) return 0;
      return index === 0 ? samples.length - 1 : index - 1;
    });
  }, [samples.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null) return 0;
      return index === samples.length - 1 ? 0 : index + 1;
    });
  }, [samples.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, samples.length, showNext, showPrevious]);

  return (
    <>
      <div className={gridClassName}>
        {samples.map((sample, index) => (
          <figure
            className={`gallery-card ${cardClassName}`.trim()}
            key={sample.title}
          >
            <button
              className="sample-media gallery-preview-trigger"
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${sample.title} preview`}
            >
              <img src={sample.image} alt={sample.title} />
            </button>
            <figcaption>{sample.title}</figcaption>
          </figure>
        ))}
      </div>

      {activeSample && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeSample.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            className="gallery-lightbox__close"
            type="button"
            onClick={closeLightbox}
            aria-label="Close preview"
          >
            <FiX />
          </button>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            <FiChevronLeft />
          </button>

          <figure className="gallery-lightbox__frame">
            <img src={activeSample.image} alt={activeSample.title} />
            <figcaption>
              <span>{activeSample.title}</span>
              <strong>
                {activeIndex + 1} / {samples.length}
              </strong>
            </figcaption>
          </figure>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            type="button"
            onClick={showNext}
            aria-label="Next image"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </>
  );
}

export default SampleGallery;
