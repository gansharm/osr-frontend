import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiCheck,
  FiClock,
  FiRefreshCw,
  FiShield,
  FiSlash,
  FiUser,
  FiX,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { apiUrl } from "../utils/api";
import { adminAuthHeaders, clearAdminToken } from "../utils/adminAuth";
import "./AdminReviewsPage.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const STATUS_ICONS = {
  pending: FiClock,
  approved: FiCheck,
  rejected: FiX,
};

function AdminStars({ rating }) {
  return (
    <div className="admin-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} className={star <= rating ? "active" : ""} />
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const Icon = STATUS_ICONS[status] || FiClock;

  return (
    <span className={`review-status ${status}`}>
      <Icon />
      {status}
    </span>
  );
}

function AdminReviewsPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const counts = useMemo(() => {
    return reviews.reduce(
      (current, review) => ({
        ...current,
        [review.status]: (current[review.status] || 0) + 1,
        all: current.all + 1,
      }),
      {
        all: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      }
    );
  }, [reviews]);

  const visibleReviews = useMemo(() => {
    if (filter === "all") {
      return reviews;
    }

    return reviews.filter((review) => review.status === filter);
  }, [filter, reviews]);

  const handleAuthExpired = useCallback(() => {
    clearAdminToken();
    navigate("/admin/login", { replace: true, state: { from: "/admin/reviews" } });
  }, [navigate]);

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(apiUrl("/api/reviews/admin"), {
        headers: adminAuthHeaders(),
      });
      setReviews(Array.isArray(response.data?.reviews) ? response.data.reviews : []);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        handleAuthExpired();
        return;
      }

      setError(requestError.response?.data?.message || "Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  }, [handleAuthExpired]);

  useEffect(() => {
    document.title = "Admin Reviews | OSR Solutions";
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadReviews();
  }, [loadReviews]);

  const updateStatus = async (reviewId, status) => {
    try {
      setUpdatingId(reviewId);
      setError("");

      const response = await axios.patch(
        apiUrl(`/api/reviews/admin/${reviewId}/status`),
        {
          status,
        },
        {
          headers: adminAuthHeaders(),
        }
      );

      const updatedReview = response.data?.review;

      setReviews((current) =>
        current.map((review) => (review.id === reviewId ? updatedReview : review))
      );
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        handleAuthExpired();
        return;
      }

      setError(requestError.response?.data?.message || "Unable to update review status.");
    } finally {
      setUpdatingId("");
    }
  };

  const logout = () => {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  };

  const formatDate = (value) => {
    if (!value) {
      return "Unknown date";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  };

  return (
    <>
      <Navbar />

      <main className="admin-reviews-page">
        <section className="admin-reviews-shell admin-hero">
          <div>
            <span className="eyebrow">Admin</span>
            <h1>
              Review
              <span>Management</span>
            </h1>
            <p>Approve or reject submitted customer reviews before they appear on the website.</p>
          </div>

          <div className="admin-hero-actions">
            <button className="btn-soft" type="button" onClick={loadReviews} disabled={loading}>
              <FiRefreshCw />
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button className="btn-soft admin-logout" type="button" onClick={logout}>
              Logout
            </button>
          </div>
        </section>

        <section className="admin-reviews-shell admin-summary" aria-label="Review status summary">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={filter === item.key ? "active" : ""}
              onClick={() => setFilter(item.key)}
            >
              <span>{item.label}</span>
              <strong>{counts[item.key]}</strong>
            </button>
          ))}
        </section>

        <section className="admin-reviews-shell admin-review-board">
          {error && <div className="admin-error">{error}</div>}

          {loading ? (
            <div className="admin-empty">Loading reviews...</div>
          ) : visibleReviews.length ? (
            <div className="admin-review-list">
              {visibleReviews.map((review) => (
                <article className="admin-review-card" key={review.id}>
                  <div className="admin-review-avatar">
                    {review.photoUrl ? (
                      <img src={review.photoUrl} alt={review.name} />
                    ) : (
                      <FiUser />
                    )}
                  </div>

                  <div className="admin-review-content">
                    <div className="admin-review-top">
                      <div>
                        <h2>{review.name}</h2>
                        {review.companyName && <span>{review.companyName}</span>}
                      </div>
                      <StatusBadge status={review.status} />
                    </div>

                    <div className="admin-review-meta">
                      <AdminStars rating={review.rating} />
                      <span>{formatDate(review.createdAt)}</span>
                    </div>

                    <p>{review.review}</p>

                    <div className="admin-review-actions">
                      <button
                        type="button"
                        className="approve"
                        onClick={() => updateStatus(review.id, "approved")}
                        disabled={updatingId === review.id || review.status === "approved"}
                      >
                        <FiCheck />
                        Approve
                      </button>
                      <button
                        type="button"
                        className="reject"
                        onClick={() => updateStatus(review.id, "rejected")}
                        disabled={updatingId === review.id || review.status === "rejected"}
                      >
                        <FiSlash />
                        Reject
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-empty">
              <FiShield />
              <span>No {filter === "all" ? "" : filter} reviews found.</span>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AdminReviewsPage;
