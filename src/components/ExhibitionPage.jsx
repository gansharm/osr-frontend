import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiImage,
  FiMap,
  FiMapPin,
  FiMessageCircle,
  FiMonitor,
  FiPlay,
  FiStar,
  FiThumbsUp,
  FiUserPlus,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";
import Navbar from "./Navbar";
import Footer from "./Footer";
import exhibitionData from "../data/exhibitionData";
import "./ExhibitionPage.css";

const iconMap = {
  visitors: FiUsers,
  demonstrations: FiMonitor,
  enquiries: FiMessageCircle,
  partnerships: FiUserPlus,
  states: FiMap,
  engagement: FiUsers,
  response: FiThumbsUp,
  connections: FiBriefcase,
};

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "", delay = 0, ...props }) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <Reveal className="exhibition-section-heading">
      <span className="exhibition-eyebrow">{eyebrow}</span>
      <h2>
        {title} <span>{accent}</span>
      </h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

function AnimatedCounter({ value, suffix }) {
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;

    if (shouldReduceMotion) {
      setDisplayValue(value);
      return undefined;
    }

    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <strong ref={counterRef}>
      {displayValue}
      {suffix}
    </strong>
  );
}

function GalleryLightbox({ images, activeIndex, onClose, onChange }) {
  useEffect(() => {
    if (activeIndex === null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % images.length);
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + images.length) % images.length);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length, onChange, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          className="exhibition-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${images[activeIndex].title} image preview`}
        >
          <motion.figure
            className="exhibition-lightbox"
            initial={{ opacity: 0, scale: 0.9, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="exhibition-modal-close" type="button" onClick={onClose} aria-label="Close image preview" autoFocus>
              <FiX />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={images[activeIndex].src}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              />
            </AnimatePresence>
            <figcaption>
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
              <strong>{images[activeIndex].title}</strong>
            </figcaption>
            <button
              className="exhibition-lightbox-arrow previous"
              type="button"
              onClick={() => onChange((activeIndex - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              <FiChevronLeft />
            </button>
            <button
              className="exhibition-lightbox-arrow next"
              type="button"
              onClick={() => onChange((activeIndex + 1) % images.length)}
              aria-label="Next image"
            >
              <FiChevronRight />
            </button>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, video]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {video && (
        <motion.div
          className="exhibition-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${video.title} video player`}
        >
          <motion.div
            className="exhibition-video-modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="exhibition-modal-close" type="button" onClick={onClose} aria-label="Close video player" autoFocus>
              <FiX />
            </button>
            <video controls autoPlay playsInline preload="metadata" poster={video.thumbnail}>
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <h3>{video.title}</h3>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ExhibitionPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [mediaNotice, setMediaNotice] = useState("");
  const galleryRef = useRef(null);
  const data = exhibitionData;

  const visibleGalleryImages = useMemo(
    () => (showAllPhotos ? data.galleryImages : data.galleryImages.slice(0, 8)),
    [data.galleryImages, showAllPhotos]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content") || "";
    document.title = `${data.name} | OSR Solutions`;
    description?.setAttribute("content", data.description);

    return () => {
      document.title = previousTitle;
      description?.setAttribute("content", previousDescription);
    };
  }, [data.description, data.name]);

  useEffect(() => {
    const modalOpen = activeImageIndex !== null || Boolean(activeVideo);
    if (!modalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeImageIndex, activeVideo]);

  useEffect(() => {
    if (shouldReduceMotion || data.testimonials.length < 2) return undefined;
    const interval = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % data.testimonials.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [data.testimonials.length, shouldReduceMotion]);

  useEffect(() => {
    if (!mediaNotice) return undefined;
    const timeout = window.setTimeout(() => setMediaNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [mediaNotice]);

  const scrollToGallery = () => galleryRef.current?.scrollIntoView({ behavior: "smooth" });

  const openVideo = (video) => {
    if (!video.src) {
      setMediaNotice("Exhibition videos will be added soon.");
      return;
    }
    setActiveVideo(video);
  };

  const changeTestimonial = (direction) => {
    setTestimonialIndex(
      (current) => (current + direction + data.testimonials.length) % data.testimonials.length
    );
  };

  const testimonial = data.testimonials[testimonialIndex];
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />

      <motion.main
        className="exhibition-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <section className="exhibition-hero" aria-labelledby="exhibition-title">
          <div className="exhibition-orb exhibition-orb-one" aria-hidden="true" />
          <div className="exhibition-orb exhibition-orb-two" aria-hidden="true" />
          <div className="exhibition-container exhibition-hero-grid">
            <motion.div
              className="exhibition-hero-copy"
              initial={{ opacity: 0, x: -38 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="exhibition-status">
                <span aria-hidden="true" />
                {data.status}
              </span>
              <h1 id="exhibition-title">
                OSR Solutions at
                <span>{data.name}</span>
              </h1>
              <p>{data.description}</p>

              <div className="exhibition-info-grid" aria-label="Event information">
                <div>
                  <FiCalendar />
                  <span>Date<strong>{data.date}</strong></span>
                </div>
                <div>
                  <FiMapPin />
                  <span>Venue<strong>{data.venue}</strong></span>
                </div>
                <div>
                  <FiUsers />
                  <span>Visitors<strong>{data.visitorCount}</strong></span>
                </div>
              </div>

              <div className="exhibition-hero-actions">
                <button className="exhibition-primary-button" type="button" onClick={scrollToGallery}>
                  <FiImage />
                  View Gallery
                  <FiArrowRight />
                </button>
                {data.brochureUrl ? (
                  <a className="exhibition-secondary-button" href={data.brochureUrl} download>
                    <FiDownload />
                    Download Brochure
                  </a>
                ) : (
                  <button
                    className="exhibition-secondary-button"
                    type="button"
                    onClick={() => setMediaNotice("The exhibition brochure will be added soon.")}
                  >
                    <FiDownload />
                    Download Brochure
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div
              className="exhibition-hero-visual"
              initial={{ opacity: 0, scale: 0.92, x: 32 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.78, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="exhibition-hero-image-wrap"
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.015, rotate: 0.25 }}
              >
                <img src={data.heroImage} alt={`OSR Solutions at ${data.name}`} fetchPriority="high" />
                <div className="exhibition-hero-image-overlay" />
              </motion.div>
              <div className="exhibition-visual-note">
                <span><FiZap /></span>
                <div>
                  <strong>Live demonstrations</strong>
                  <small>Precision printing in action</small>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="exhibition-statistics" aria-label="Exhibition statistics">
          <div className="exhibition-container exhibition-stat-grid">
            {data.statistics.map((stat, index) => {
              const Icon = iconMap[stat.icon] || FiStar;
              return (
                <Reveal className="exhibition-stat-card" delay={index * 0.06} key={stat.label}>
                  <span className="exhibition-card-icon"><Icon /></span>
                  <div>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p>{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="exhibition-section exhibition-gallery-section" ref={galleryRef}>
          <div className="exhibition-container">
            <SectionHeading
              eyebrow="Exhibition Gallery"
              title="Moments From The"
              accent="Show Floor"
              description="Explore the people, technology and conversations that made the exhibition memorable."
            />

            <motion.div className="exhibition-gallery-grid" layout>
              <AnimatePresence initial={false}>
                {visibleGalleryImages.map((image, index) => (
                  <motion.button
                    className="exhibition-gallery-card"
                    type="button"
                    key={image.src}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.38, delay: Math.min(index * 0.035, 0.24) }}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Open ${image.title} in image viewer`}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                    <span className="exhibition-gallery-overlay">
                      <span><FiImage /></span>
                      <strong>{image.title}</strong>
                      <small>View photo</small>
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            {data.galleryImages.length > 8 && (
              <button
                className="exhibition-outline-button exhibition-gallery-more"
                type="button"
                onClick={() => setShowAllPhotos((current) => !current)}
              >
                <FiImage />
                {showAllPhotos ? "Show Fewer Photos" : "View More Photos"}
                <FiArrowRight />
              </button>
            )}
          </div>
        </section>

        <section className="exhibition-section exhibition-video-section">
          <div className="exhibition-container">
            <SectionHeading
              eyebrow="Video Gallery"
              title="Watch The Exhibition"
              accent="Come Alive"
              description="A closer look at live demonstrations, visitor experiences and event highlights."
            />
            <div className="exhibition-video-grid">
              {data.videos.map((video, index) => (
                <Reveal className="exhibition-video-card" delay={index * 0.08} key={video.title}>
                  <button type="button" onClick={() => openVideo(video)} aria-label={`Play ${video.title}`}>
                    <span className="exhibition-video-thumbnail">
                      <img src={video.thumbnail} alt="" loading="lazy" decoding="async" />
                      <motion.span className="exhibition-play-button" whileHover={{ scale: 1.1 }}>
                        <FiPlay />
                      </motion.span>
                      <small>{video.src ? video.duration : "Video coming soon"}</small>
                    </span>
                    <span className="exhibition-video-copy">
                      <span>
                        <strong>{video.title}</strong>
                        <small>{video.description}</small>
                      </span>
                      <FiArrowRight />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="exhibition-section exhibition-highlights-section">
          <div className="exhibition-container">
            <SectionHeading
              eyebrow="Event Highlights"
              title="An Exhibition Full Of"
              accent="Possibilities"
              description="Technology, conversations and new opportunities—all in one energetic show-floor experience."
            />
            <div className="exhibition-highlights-grid">
              {data.highlights.map((highlight, index) => {
                const Icon = iconMap[highlight.icon] || FiStar;
                return (
                  <Reveal className="exhibition-highlight-card" delay={index * 0.07} key={highlight.title}>
                    <span className="exhibition-highlight-number">0{index + 1}</span>
                    <span className="exhibition-card-icon"><Icon /></span>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="exhibition-section exhibition-testimonials-section">
          <div className="exhibition-container">
            <SectionHeading
              eyebrow="Visitor Testimonials"
              title="What Our Visitors"
              accent="Had To Say"
              description="Feedback from print professionals who spent time with the OSR Solutions team."
            />
            <Reveal className="exhibition-testimonial-shell">
              <span className="exhibition-quote-mark" aria-hidden="true">“</span>
              <button
                className="exhibition-testimonial-arrow previous"
                type="button"
                onClick={() => changeTestimonial(-1)}
                aria-label="Previous testimonial"
              >
                <FiChevronLeft />
              </button>

              <div className="exhibition-testimonial-viewport" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.article
                    className="exhibition-testimonial-card"
                    key={testimonial.name}
                    initial={{ opacity: 0, x: 28, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -28, scale: 0.98 }}
                    transition={{ duration: 0.42 }}
                  >
                    <div className="exhibition-stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {Array.from({ length: testimonial.rating }, (_, star) => <FiStar key={star} />)}
                    </div>
                    <blockquote>“{testimonial.review}”</blockquote>
                    <div className="exhibition-visitor">
                      {testimonial.photo ? (
                        <img src={testimonial.photo} alt={testimonial.name} loading="lazy" />
                      ) : (
                        <span aria-hidden="true">{initials}</span>
                      )}
                      <div>
                        <strong>{testimonial.name}</strong>
                        <small>{testimonial.company}</small>
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              <button
                className="exhibition-testimonial-arrow next"
                type="button"
                onClick={() => changeTestimonial(1)}
                aria-label="Next testimonial"
              >
                <FiChevronRight />
              </button>
              <div className="exhibition-testimonial-dots" aria-label="Choose testimonial">
                {data.testimonials.map((item, index) => (
                  <button
                    type="button"
                    className={testimonialIndex === index ? "active" : ""}
                    key={item.name}
                    onClick={() => setTestimonialIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={testimonialIndex === index ? "true" : undefined}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="exhibition-cta-section">
          <div className="exhibition-container">
            <Reveal className="exhibition-cta-card">
              <div className="exhibition-cta-grid" aria-hidden="true" />
              <motion.span
                className="exhibition-cta-icon"
                animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiCalendar />
              </motion.span>
              <div>
                <span className="exhibition-eyebrow">What’s Next</span>
                <h2>See You At Our Next Exhibition!</h2>
                <p>Stay connected with OSR Solutions for upcoming exhibitions, live demos and product launches.</p>
              </div>
              <button className="exhibition-primary-button" type="button" onClick={() => navigate("/contact")}>
                Stay Updated
                <FiArrowRight />
              </button>
            </Reveal>
          </div>
        </section>
      </motion.main>

      <Footer />

      <GalleryLightbox
        images={data.galleryImages}
        activeIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(null)}
        onChange={setActiveImageIndex}
      />
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      <AnimatePresence>
        {mediaNotice && (
          <motion.div
            className="exhibition-media-notice"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            role="status"
          >
            {mediaNotice}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

export default ExhibitionPage;
