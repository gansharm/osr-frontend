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
import delhi1 from "../media/exhibition/images/delhi1.jpeg";//1
import delhi2 from "../media/exhibition/images/delhi2.jpeg";//2
import delhi3 from "../media/exhibition/images/delhi3.jpeg";//3
import delhi4 from "../media/exhibition/images/delhi4.jpeg";//4
import delhi5 from "../media/exhibition/images/delhi5.jpeg";//5
import delhi7 from "../media/exhibition/images/delhi7.jpeg";//6
 import delhi9 from "../media/exhibition/images/delhi9.jpeg";//8
 import delhi11 from "../media/exhibition/images/delhi11.jpeg";//10
import delhi14 from "../media/exhibition/images/delhi14.jpeg";//11
import delhi13 from "../media/exhibition/images/delhi13.jpeg";//12
import delhi20 from "../media/exhibition/images/delhi20.jpeg";//12
import delhi19 from "../media/exhibition/images/delhi19.jpeg";//12

import expoVideo1Poster from "../media/exhibition/images/expo_video1_poster.jpg";
import expoVideo2Poster from "../media/exhibition/images/expo_video2_poster.jpg";
import expoVideo3Poster from "../media/exhibition/images/expo_video3_poster.jpg";
import delhiVideo1Poster from "../media/exhibition/images/delhi1.jpeg";
import delhiVideo2Poster from "../media/exhibition/images/delhi2.jpeg";
import delhiVideo3Poster from "../media/exhibition/images/delhi3.jpeg";

import expoVideo1 from "../media/exhibition/videos/expo_video1.mp4";
import expoVideo2 from "../media/exhibition/videos/expo_video2.mp4";
import expoVideo3 from "../media/exhibition/videos/expo_video3.mp4";
import delhiVideo1 from "../media/exhibition/videos/delhi1.mp4";
import delhiVideo2 from "../media/exhibition/videos/delhi2.mp4";
import delhiVideo3 from "../media/exhibition/videos/delhi3.mp4";


// This is the only file that needs editing when exhibition content changes.
// Videos can be imported from media/exhibition/videos and assigned to `src`.
export const exhibitionData = {
  id: "guwahati-2026",
  shortName: "Guwahati",
  cardDate: "26 – 28 June 2026",
  cardVenue: "Maniram Dewan Trade Center, Guwahati",
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

// Delhi uses the same event schema as Guwahati so the page, gallery and
// lightbox remain one shared experience. The supplied OSR show-floor photos
// are intentionally referenced rather than introducing stock imagery.
export const delhiExhibitionData = {
  id: "delhi-2025",
  status: "Event Completed",
  name: "Bharat Mandapam New Delhi Expo 2025",
  shortName: "Delhi",
  cardDate: "17 – 19 September 2025",
  cardVenue: "Bharat Mandapam, New Delhi",
  date: "17 – 19 September 2025",
  venue: "Bharat Mandapam, New Delhi",
  visitorCount: "1,000+",
  description:
    "OSR Solutions connected with print professionals at Bharat Mandapam through live machine demonstrations, product samples and meaningful business conversations.",
  heroImage: delhi20,
  brochureUrl: "",
  statistics: [
    { value: 1000, suffix: "+", label: "Visitors", icon: "visitors" },
    { value: 18, suffix: "+", label: "Live Demonstrations", icon: "demonstrations" },
    { value: 145, suffix: "+", label: "Business Enquiries", icon: "enquiries" },
    { value: 30, suffix: "+", label: "New Partnerships", icon: "partnerships" },
    { value: 8, suffix: "", label: "States Reached", icon: "states" },
  ],
  galleryImages: [
    { src: delhi1, title: "Customer Discussion", alt: "OSR Solutions discussing print requirements with a Bharat Mandapam visitor" },
    { src: delhi2, title: "OSR Booth at Bharat Mandapam", alt: "OSR Solutions booth at Bharat Mandapam New Delhi" },
    { src: delhi3, title: "Visitor Interaction", alt: "Visitors interacting with the OSR Solutions team" },
    { src: delhi4, title: "OSR Team at the Expo", alt: "OSR Solutions team at the New Delhi exhibition" },
    { src: delhi5, title: "Business Conversations", alt: "Business discussion at the OSR exhibition booth" },
      { src: delhi7, title: "Live Machine Demonstration", alt: "OSR live printing machine demonstration" },
     { src: delhi9, title: "Expo Crowd", alt: "Visitors at the Bharat Mandapam expo" },
     { src: delhi11, title: "Print Sample Showcase", alt: "Printed samples showcased at the OSR booth" },
    { src: delhi14, title: "Visitor Engagement", alt: "OSR team engaging with exhibition visitors" },
    { src: delhi13, title: "Booth Overview", alt: "OSR Solutions exhibition booth overview" },
        { src: delhi20, title: "Booth Overview", alt: "OSR Solutions exhibition booth overview" },
    { src: delhi19, title: "OSR Team at the Expo", alt: "OSR Solutions team at the New Delhi exhibition" },

  ],
  videos: [
    { title: "Delhi Exhibition Experience", thumbnail: delhiVideo1Poster, src: delhiVideo1, duration: "00:28", description: "Conversations and connections from Bharat Mandapam." },
    { title: "Inside the Delhi Booth", thumbnail: delhiVideo2Poster, src: delhiVideo2, duration: "00:18", description: "A closer look at the OSR exhibition booth." },
    { title: "Delhi Expo Highlights", thumbnail: delhiVideo3Poster, src: delhiVideo3, duration: "00:30", description: "Products, people and live activity at the show." },
  ],
  highlights: [
    { icon: "demonstrations", title: "Live Machine Demonstrations", description: "Visitors saw print speed, precision and output quality first-hand." },
    { icon: "engagement", title: "Meaningful Conversations", description: "The team discussed practical solutions with print professionals and business owners." },
    { icon: "response", title: "Positive Response", description: "Our machines and printed samples received an enthusiastic response from visitors." },
    { icon: "connections", title: "Industry Connections", description: "The exhibition created valuable relationships across the print industry." },
  ],
  testimonials: [
    { name: "Rahul Mehta", company: "Spectrum Printworks", photo: "", review: "The live demonstration was clear and practical. It gave us a strong understanding of the machine's capabilities.", rating: 5 },
    { name: "Priya Verma", company: "Printline Studio", photo: "", review: "The OSR team was knowledgeable and welcoming. We had a useful discussion about the right solution for our work.", rating: 5 },
    { name: "Arjun Khanna", company: "Vision Graphics", photo: "", review: "Seeing the print samples and machine performance in person made the exhibition visit worthwhile.", rating: 5 },
  ],
};

export const exhibitionEvents = [exhibitionData, delhiExhibitionData];

export default exhibitionData;
