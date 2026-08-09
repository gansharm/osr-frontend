import customerTestimonialVideo from "../videos/customer-feedback.mp4";

// Add one object per customer video. Files stored under src can be imported as
// above; alternatively, place them in public/media/testimonials and use their
// public paths here (for example: /media/testimonials/videos/name.mp4).
// Example:
// {
//   id: "customer-name",
//   videoUrl: "/media/testimonials/videos/customer-name.mp4",
//   poster: "/media/testimonials/images/customer-name.jpg",
//   name: "Customer Name",
//   companyName: "Business Name",
//   feedback: "A short customer feedback quote.",
// },
const videoTestimonials = [
  {
    id: "customer-video-1",
    videoUrl: customerTestimonialVideo,
    name: "OSR Solutions Customer",
    companyName: "",
    feedback: "Hear directly from our customer about their experience with OSR Solutions.",
  },
];

export default videoTestimonials;
