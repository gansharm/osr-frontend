import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiAward,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiHeadphones,
  FiPlus,
  FiSend,
  FiShield,
  FiSmile,
  FiTool,
  FiUploadCloud,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { apiUrl } from "../utils/api";
import "./ReviewsPage.css";

const FALLBACK_REVIEWS = [
  {
    id: "featured-1",
    name: "Rajesh Kumar",
    companyName: "ABC Packaging Pvt Ltd",
    rating: 5,
    review:
      "Excellent installation and support. Machine performance exceeded our expectations. Highly recommended!",
  },
  {
    id: "featured-2",
    name: "Vikram Singh",
    companyName: "Shree Ganesh Industries",
    rating: 5,
    review: "Great build quality and superb after-sales service.",
  },
  {
    id: "featured-3",
    name: "Anita Sharma",
    companyName: "Krishna Packaging",
    rating: 5,
    review: "On-time delivery and smooth installation.",
  },
  {
    id: "featured-4",
    name: "Manoj Patel",
    companyName: "Horizon Polymers",
    rating: 5,
    review: "Very professional team and quick response support.",
  },
  {
    id: "featured-5",
    name: "Suresh Yadav",
    companyName: "Yadav Enterprises",
    rating: 5,
    review: "Machines are running perfectly. Very happy!",
  },
  {
    id: "featured-6",
    name: "Neha Verma",
    companyName: "Verma Packaging",
    rating: 5,
    review: "Best quality machines at competitive price.",
  },
];

const STATS = [
  {
    value: "4.9/5",
    label: "Customer Rating",
    detail: "Based on 200+ reviews",
    icon: FaStar,
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
    detail: "Our customers are happy",
    icon: FiShield,
  },
  {
    value: "500+",
    label: "Machines Installed",
    detail: "Across India",
    icon: FiUsers,
  },
  {
    value: "200+",
    label: "Happy Clients",
    detail: "And growing",
    icon: FiSmile,
  },
];

const TRUST_POINTS = [
  ["Quality Assured", "ISO certified products", FiShield],
  ["24/7 Support", "Always here to help", FiHeadphones],
  ["Installation Support", "Expert installation team", FiTool],
  ["Warranty", "Reliable machine coverage", FiAward],
  ["Trusted by Businesses", "Companies across India", FiUsers],
];

const emptyForm = {
  name: "",
  companyName: "",
  rating: 0,
  review: "",
  photoUrl: "",
};

const updateMetaTag = (selector, attributes) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("data-reviews-meta", "true");
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
};

function RatingStars({ rating, interactive = false, onSelect }) {
  return (
    <div className={`review-stars ${interactive ? "interactive" : ""}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= rating;

        if (interactive) {
          return (
            <button
              type="button"
              key={star}
              className={active ? "active" : ""}
              onClick={() => onSelect(star)}
              aria-label={`Select ${star} star rating`}
            >
              <FaStar />
            </button>
          );
        }

        return <FaStar key={star} className={active ? "active" : ""} />;
      })}
    </div>
  );
}

function ReviewAvatar({ review }) {
  const initials = review.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (review.photoUrl) {
    return <img src={review.photoUrl} alt={review.name} />;
  }

  return <span>{initials || "OS"}</span>;
}

function ReviewsPage() {
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [photoName, setPhotoName] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const displayReviews = approvedReviews.length ? approvedReviews : FALLBACK_REVIEWS;
  const sliderReviews = useMemo(() => displayReviews.slice(0, 6), [displayReviews]);
  const featuredReview = sliderReviews[activeIndex] || sliderReviews[0];

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionMeta?.getAttribute("content") || "";
    const canonical = document.createElement("link");
    const schema = document.createElement("script");

    document.title = "Customer Reviews | OSR Solutions";

    updateMetaTag('meta[name="description"]', {
      name: "description",
      content:
        "Read OSR Solutions customer reviews, ratings, satisfaction stories, and printing machinery feedback.",
    });
    updateMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: "Customer Reviews | OSR Solutions",
    });
    updateMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content:
        "Real customer reviews and success stories from businesses using OSR Solutions printing machines.",
    });

    canonical.rel = "canonical";
    canonical.href = "https://osrsolutions.in/reviews";
    canonical.setAttribute("data-reviews-meta", "true");
    document.head.appendChild(canonical);

    schema.type = "application/ld+json";
    schema.setAttribute("data-reviews-meta", "true");
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "OSR Solutions",
      url: "https://osrsolutions.in/reviews",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "200",
      },
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle || "OSR Solutions";
      if (descriptionMeta) {
        descriptionMeta.setAttribute("content", previousDescription);
      }

      document
        .querySelectorAll("[data-reviews-meta='true']")
        .forEach((node) => node.remove());
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadReviews = async () => {
      try {
        setLoadingReviews(true);
        setReviewsError("");

        const response = await axios.get(apiUrl("/api/reviews"));
        const liveReviews = Array.isArray(response.data?.reviews) ? response.data.reviews : [];

        if (mounted) {
          setApprovedReviews(liveReviews);
        }
      } catch (error) {
        if (mounted) {
          setReviewsError("Live reviews are temporarily unavailable. Showing featured stories.");
        }
      } finally {
        if (mounted) {
          setLoadingReviews(false);
        }
      }
    };

    loadReviews();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [sliderReviews.length]);

  useEffect(() => {
    if (sliderReviews.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % sliderReviews.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [sliderReviews.length]);

  useEffect(() => {
    document.body.classList.toggle("review-modal-open", modalOpen);
    return () => document.body.classList.remove("review-modal-open");
  }, [modalOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [modalOpen]);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setFormError("");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPhotoName("");
      setForm((current) => ({ ...current, photoUrl: "" }));
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      setFormError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Please upload an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoName(file.name);
      setForm((current) => ({
        ...current,
        photoUrl: reader.result || "",
      }));
      setFormError("");
    };
    reader.onerror = () => setFormError("Could not read the selected image.");
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setPhotoName("");
    setFormError("");
  };

  const submitReview = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.review.trim() || !form.rating) {
      setFormError("Name, rating, and review message are required.");
      return;
    }

    try {
      setSubmitting(true);
      setFormError("");
      setSuccessMessage("");

      await axios.post(apiUrl("/api/reviews"), {
        name: form.name.trim(),
        companyName: form.companyName.trim(),
        rating: form.rating,
        review: form.review.trim(),
        photoUrl: form.photoUrl,
      });

      resetForm();
      setSuccessMessage("Thank you. Your review is pending approval and will appear after verification.");
    } catch (error) {
      setFormError(error.response?.data?.message || "Could not submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goToSlide = (direction) => {
    setActiveIndex((current) => {
      if (direction === "prev") {
        return current === 0 ? sliderReviews.length - 1 : current - 1;
      }

      return (current + 1) % sliderReviews.length;
    });
  };

  return (
    <>
      <Navbar />

      <main className="reviews-page">
        <section className="reviews-showcase">
          <span className="reviews-bg-ball ball-one" />
          <span className="reviews-bg-ball ball-two" />
          <span className="reviews-bg-ball ball-three" />
          <span className="reviews-bg-wave wave-left" />
          <span className="reviews-bg-wave wave-right" />

          <div className="reviews-shell">
            <div className="reviews-heading reveal">
              <span className="reviews-badge">
                <FaStar />
                Testimonials
              </span>
              <h1>
                What Our <span>Customers</span> Say
              </h1>
              <p>Real experiences from customers who trust OSR Solutions.</p>
              {reviewsError && <small className="inline-alert">{reviewsError}</small>}
            </div>

            <div className="featured-review-wrap">
              <button
                className="slider-arrow"
                type="button"
                onClick={() => goToSlide("prev")}
                aria-label="Previous review"
              >
                <FiChevronLeft />
              </button>

              {loadingReviews ? (
                <div className="featured-review-card loading-card">Loading customer reviews...</div>
              ) : (
                <article className="featured-review-card reveal">
                  <div className="featured-review-content">
                    <RatingStars rating={featuredReview.rating} />
                    <p className="featured-review-text">
                      <span className="review-inline-quote opening">&ldquo;</span>
                      {featuredReview.review}
                      <span className="review-inline-quote closing">&rdquo;</span>
                    </p>
                    <div className="review-person">
                      <div className="review-avatar">
                        <ReviewAvatar review={featuredReview} />
                      </div>
                      <div>
                        <strong>{featuredReview.name}</strong>
                        {featuredReview.companyName && <span>{featuredReview.companyName}</span>}
                      </div>
                    </div>
                  </div>
                </article>
              )}

              <button
                className="slider-arrow"
                type="button"
                onClick={() => goToSlide("next")}
                aria-label="Next review"
              >
                <FiChevronRight />
              </button>
            </div>

            <div className="review-dots" aria-label="Review slides">
              {sliderReviews.map((review, index) => (
                <button
                  key={review.id || review.name}
                  type="button"
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show review ${index + 1}`}
                />
              ))}
            </div>

            <div className="mini-review-grid">
              {sliderReviews.slice(0, 5).map((review, index) => (
                <article
                  key={`mini-${review.id || review.name}`}
                  className={index === activeIndex ? "mini-review active" : "mini-review"}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="mini-quote">"</span>
                  <RatingStars rating={review.rating} />
                  <p>{review.review}</p>
                  <div className="mini-review-person">
                    <div className="mini-avatar">
                      <ReviewAvatar review={review} />
                    </div>
                    <div>
                      <strong>{review.name}</strong>
                      {review.companyName && <span>{review.companyName}</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <section className="reviews-stats" aria-label="Customer review statistics">
              {STATS.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div className="review-stat-card reveal" key={stat.label}>
                    <Icon />
                    <div>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                      <small>{stat.detail}</small>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="review-cta">
              <div>
                <h2>Have an experience with our machines?</h2>
                <p>Share your feedback and help others make the right choice.</p>
              </div>
              <button className="btn-primary" type="button" onClick={() => setModalOpen(true)}>
                <FiPlus />
                Add Your Review
              </button>
            </section>

            <section className="trust-rail" aria-label="Customer trust benefits">
              {TRUST_POINTS.map(([title, detail, Icon]) => (
                <div key={title}>
                  <Icon />
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </div>
              ))}
            </section>
          </div>
        </section>
      </main>

      <Footer />

      {modalOpen && (
        <div className="review-modal-backdrop" role="presentation" onMouseDown={() => setModalOpen(false)}>
          <div
            className="review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-review-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="review-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close add review form"
            >
              <FiX />
            </button>

            <div className="review-modal-head">
              <FiEdit3 />
              <div>
                <h2 id="add-review-title">Add Your Review</h2>
                <p>We value your feedback. Please share your experience.</p>
              </div>
            </div>

            {successMessage && (
              <div className="review-success" role="status">
                <FiCheckCircle />
                <span>{successMessage}</span>
              </div>
            )}

            <form className="review-form" onSubmit={submitReview}>
              <div className="review-form-grid">
                <div className="review-field">
                  <label htmlFor="reviewer-name">Your Name *</label>
                  <input
                    id="reviewer-name"
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="Enter your full name"
                    maxLength={80}
                    required
                  />
                </div>

                <div className="review-field">
                  <label htmlFor="reviewer-company">Company Name</label>
                  <input
                    id="reviewer-company"
                    name="companyName"
                    value={form.companyName}
                    onChange={updateForm}
                    placeholder="Enter your company name"
                    maxLength={120}
                  />
                </div>

                <div className="review-field">
                  <label>Rating *</label>
                  <RatingStars
                    rating={form.rating}
                    interactive
                    onSelect={(rating) => {
                      setForm((current) => ({ ...current, rating }));
                      setFormError("");
                    }}
                  />
                  <small>{form.rating ? `${form.rating}/5 selected` : "Select rating"}</small>
                </div>

                <div className="review-field photo-field">
                  <label htmlFor="reviewer-photo">Upload Photo</label>
                  <label className="photo-upload" htmlFor="reviewer-photo">
                    {form.photoUrl ? (
                      <img src={form.photoUrl} alt="Selected customer" />
                    ) : (
                      <FiUploadCloud />
                    )}
                    <span>{photoName || "Click to upload or drag and drop"}</span>
                    <small>JPG, PNG, WEBP. Max 5MB.</small>
                  </label>
                  <input
                    id="reviewer-photo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>

              <div className="review-field">
                <label htmlFor="review-message">Your Review *</label>
                <textarea
                  id="review-message"
                  name="review"
                  value={form.review}
                  onChange={updateForm}
                  placeholder="Share your experience with our machines and services..."
                  maxLength={500}
                  required
                />
                <small>{form.review.length}/500</small>
              </div>

              {formError && <div className="review-error">{formError}</div>}

              <div className="review-modal-actions">
                <button type="button" className="btn-soft" onClick={resetForm} disabled={submitting}>
                  Clear
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  <FiSend />
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}

export default ReviewsPage;
