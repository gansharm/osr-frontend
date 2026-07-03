import expo1 from "../media/exhibition/images/expo1.jpeg";
import expo2 from "../media/exhibition/images/expo2.jpeg";
import expo3 from "../media/exhibition/images/expo3.jpeg";
import expo4 from "../media/exhibition/images/expo4.jpeg";
import expo5 from "../media/exhibition/images/expo5.jpeg";
import expo6 from "../media/exhibition/images/expo6.jpeg";
import expo7 from "../media/exhibition/images/expo7.jpeg";
import expo8 from "../media/exhibition/images/expo8.jpeg";
import expo9 from "../media/exhibition/images/expo9.jpeg";
import expo10 from "../media/exhibition/images/expo10.jpeg";
import expo11 from "../media/exhibition/images/expo11.jpeg";
import expo12 from "../media/exhibition/images/expo12.jpeg";
import expo13 from "../media/exhibition/images/expo13.jpeg";
import expoVideo1Poster from "../media/exhibition/images/expo_video1_poster.jpg";
import expoVideo2Poster from "../media/exhibition/images/expo_video2_poster.jpg";
import expoVideo3Poster from "../media/exhibition/images/expo_video3_poster.jpg";
import expoVideo1 from "../media/exhibition/videos/expo_video1.mp4";
import expoVideo2 from "../media/exhibition/videos/expo_video2.mp4";
import expoVideo3 from "../media/exhibition/videos/expo_video3.mp4";

// This is the only file that needs editing when exhibition content changes.
// Videos can be imported from media/exhibition/videos and assigned to `src`.
export const exhibitionData = {
  status: "Event Completed",
  name: "North East Print & Pack Expo 2026",
  date: "26, 27 & 28 June",
  venue: "Maniram Dewan Trade Center",
  visitorCount: "500+",
  description:
    "OSR Solutions brought precision printing to life with live machine demonstrations, print samples and one-to-one conversations with print professionals from across the region.",
  heroImage: expo7,
  brochureUrl: "",
  statistics: [
    { value: 500, suffix: "+", label: "Visitors", icon: "visitors" },
    { value: 15, suffix: "+", label: "Live Demonstrations", icon: "demonstrations" },
    { value: 120, suffix: "+", label: "Business Enquiries", icon: "enquiries" },
    { value: 25, suffix: "+", label: "New Partnerships", icon: "partnerships" },
    { value: 4, suffix: "", label: "States Reached", icon: "states" },
  ],
  galleryImages: [
    { src: expo1, title: "One-to-One Consultation", alt: "OSR team assisting a visitor at the exhibition" },
    { src: expo2, title: "Business Discussions", alt: "OSR Solutions team discussing printing solutions with visitors" },
    { src: expo3, title: "Visitor Engagement", alt: "Visitors engaging with the OSR exhibition team" },
    { src: expo4, title: "OSR Exhibition Team", alt: "OSR Solutions team at the exhibition booth" },
    { src: expo5, title: "Industry Connections", alt: "OSR team with printing industry visitors" },
    { src: expo6, title: "Print Technology Showcase", alt: "Printing technology showcased at the OSR booth" },
    { src: expo7, title: "Live UV Printing", alt: "Live UV printer demonstration by OSR Solutions" },
    { src: expo8, title: "Machine Demonstration", alt: "Visitors watching an OSR machine demonstration" },
    { src: expo9, title: "Product Experience", alt: "Visitors viewing products at the OSR booth" },
    { src: expo10, title: "Business Enquiries", alt: "OSR team handling exhibition business enquiries" },
    { src: expo11, title: "Print Quality Display", alt: "Printed samples displayed during the exhibition" },
    { src: expo12, title: "Industry Networking", alt: "OSR professionals networking with exhibition visitors" },
    { src: expo13, title: "At the OSR Booth", alt: "OSR representative at the printing exhibition booth" },
  ],
  videos: [
    {
      title: "Exhibition Experience",
      thumbnail: expoVideo1Poster,
      src: expoVideo1,
      duration: "00:28",
      description: "Conversations and connections from the show floor.",
    },
    {
      title: "Inside the OSR Booth",
      thumbnail: expoVideo2Poster,
      src: expoVideo2,
      duration: "00:18",
      description: "A closer look at the exhibition experience.",
    },
    {
      title: "Live Exhibition Highlights",
      thumbnail: expoVideo3Poster,
      src: expoVideo3,
      duration: "00:30",
      description: "Products, people and live activity at the OSR booth.",
    },
  ],
  highlights: [
    {
      icon: "demonstrations",
      title: "Live Machine Demonstrations",
      description: "Visitors experienced print speed, precision and output quality first-hand.",
    },
    {
      icon: "engagement",
      title: "Great Visitor Engagement",
      description: "Meaningful discussions helped businesses find solutions for their exact needs.",
    },
    {
      icon: "response",
      title: "Positive Response",
      description: "Our machines and print samples received an enthusiastic response from visitors.",
    },
    {
      icon: "connections",
      title: "Business Connections",
      description: "The event created valuable relationships with print professionals across the region.",
    },
  ],
  testimonials: [
    {
      name: "Amit Sharma",
      company: "Creative Print House",
      photo: "",
      review:
        "The live demonstration made it easy to understand the machine quality. The OSR team answered every technical question clearly.",
      rating: 5,
    },
    {
      name: "Rakesh Das",
      company: "RD Graphics",
      photo: "",
      review:
        "A very informative experience. We could compare print samples, discuss applications and get practical guidance from the team.",
      rating: 5,
    },
    {
      name: "Neha Agarwal",
      company: "Pixel Craft Studio",
      photo: "",
      review:
        "The booth was professional and welcoming. Seeing the printer perform live gave us confidence in the solution.",
      rating: 5,
    },
  ],
};

export default exhibitionData;
