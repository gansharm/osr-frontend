import { useRef, useState } from "react";
import { FiPlay, FiVideo } from "react-icons/fi";
import videoTestimonials from "../data/videoTestimonials";

function VideoTestimonialCard({ testimonial }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    videoRef.current?.play();
  };

  return (
    <article className="video-testimonial-card">
      <div className="video-testimonial-media">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={testimonial.poster}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          aria-label={`Video testimonial from ${testimonial.name}`}
        >
          <source src={testimonial.videoUrl} type={testimonial.type || "video/mp4"} />
          Your browser does not support HTML5 video.
        </video>
        {!isPlaying && (
          <button
            className="video-testimonial-play"
            type="button"
            onClick={playVideo}
            aria-label={`Play testimonial from ${testimonial.name}`}
          >
            <FiPlay />
          </button>
        )}
      </div>
      <div className="video-testimonial-content">
        <p>{testimonial.feedback}</p>
        <div>
          <strong>{testimonial.name}</strong>
          {testimonial.companyName && <span>{testimonial.companyName}</span>}
        </div>
      </div>
    </article>
  );
}

function VideoTestimonials() {
  return (
    <section className="video-testimonials" aria-labelledby="video-testimonials-title">
      <div className="video-testimonials-heading">
        <span className="reviews-badge">
          <FiVideo />
          Video Stories
        </span>
        <h2 id="video-testimonials-title">Customer Video <span>Testimonials</span></h2>
        <p>See what our customers have to say about OSR Solution.</p>
      </div>

      {videoTestimonials.length ? (
        <div className="video-testimonials-grid">
          {videoTestimonials.map((testimonial) => (
            <VideoTestimonialCard key={testimonial.id || testimonial.videoUrl} testimonial={testimonial} />
          ))}
        </div>
      ) : (
        <div className="video-testimonials-empty">
          <span><FiVideo /></span>
          <div>
            <strong>Customer testimonials coming soon.</strong>
            <p>We are preparing real customer stories to share with you.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export { VideoTestimonialCard };
export default VideoTestimonials;
