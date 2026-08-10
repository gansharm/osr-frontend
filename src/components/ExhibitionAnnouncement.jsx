import { FiArrowRight, FiCalendar, FiMapPin, FiZap } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import exhibitionVisual from "../media/exhibition/images/expo2.jpeg";
import "./ExhibitionAnnouncement.css";

export const EXHIBITION_AD_EXPIRY = "2026-09-20";

export const exhibitionAnnouncement = {
  id: "delhi-september-2026",
  brand: "OSR Solutions",
  title: "OSR Solutions is Coming to Delhi!",
  venue: "Pragati Maidan",
  city: "New Delhi",
  dates: "17 - 19 September 2026",
  label: "Exhibition / Stall",
  description:
    "Visit our stall to explore our latest printing machines, live demonstrations, products and solutions.",
  primaryAction: "Visit Our Stall",
  secondaryAction: "Learn More",
  destination: "/exhibition",
  image: exhibitionVisual,
};

const getExpiryTime = () => new Date(`${EXHIBITION_AD_EXPIRY}T23:59:59.999`).getTime();

const isExpired = () => {
  const expiryTime = getExpiryTime();
  return Number.isNaN(expiryTime) || Date.now() > expiryTime;
};

function ExhibitionAnnouncement() {
  const location = useLocation();

  // Keep management pages clear and remove the ad after its campaign ends.
  if (isExpired() || location.pathname.startsWith("/admin")) return null;

  return (
    <aside className="exhibition-announcement" aria-label="Upcoming exhibition announcement">
      <Link className="exhibition-announcement-link" to={exhibitionAnnouncement.destination}>
        <span className="exhibition-announcement-cuboid" aria-hidden="true">
          <span className="exhibition-announcement-face exhibition-announcement-face-front">
            <img src={exhibitionAnnouncement.image} alt="" />
            <span className="exhibition-announcement-copy">
              <span className="exhibition-announcement-label">{exhibitionAnnouncement.label}</span>
              <strong>{exhibitionAnnouncement.title}</strong>
              <span className="exhibition-announcement-meta"><FiMapPin /> {exhibitionAnnouncement.venue}</span>
              <span className="exhibition-announcement-meta"><FiCalendar /> {exhibitionAnnouncement.dates}</span>
            </span>
            <span className="exhibition-announcement-cta"><FiZap /> {exhibitionAnnouncement.primaryAction} <FiArrowRight /></span>
          </span>
          <span className="exhibition-announcement-face exhibition-announcement-face-right">
            <strong>Delhi Exhibition</strong>
            <span>{exhibitionAnnouncement.dates}</span>
          </span>
          <span className="exhibition-announcement-face exhibition-announcement-face-back">
            <strong>{exhibitionAnnouncement.brand}</strong>
            <span>Live machine demos</span>
          </span>
          <span className="exhibition-announcement-face exhibition-announcement-face-left">
            <strong>{exhibitionAnnouncement.venue}</strong>
            <span>{exhibitionAnnouncement.city}</span>
          </span>
        </span>
        <span className="sr-only">
          {exhibitionAnnouncement.title}. {exhibitionAnnouncement.venue}, {exhibitionAnnouncement.city}. {exhibitionAnnouncement.dates}.
        </span>
      </Link>
    </aside>
  );
}

export default ExhibitionAnnouncement;
