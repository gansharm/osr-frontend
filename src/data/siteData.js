import A3F from "../images/A3F.png";
import allInOne from "../images/ALL-IN-ONE.png";
import allInOne1 from "../images/ALL-IN-ONE1.png";
import allInOne2 from "../images/ALL-IN-ONE2.png";
import allInOne3 from "../images/ALL-IN-ONE3.png";
import allInOne4 from "../images/ALL-IN-ONE4.png";
import allInOne5 from "../images/ALL-IN-ONE5.png";
import allInOne6 from "../images/ALL-IN-ONE6.png";
import allInOne7 from "../images/ALL-IN-ONE7.png";
import allInOne8 from "../images/ALL-IN-ONE8.png";
import D602 from "../images/D602.png";
import DTF from "../images/DTF.png";
import DTF1 from "../images/DTF1.png";
import DTF2 from "../images/DTF2.png";
import flex from "../images/flex.png";
import flex2 from "../images/flex2.png";
import flex3 from "../images/flex3.png";
import head from "../images/head.jpeg";
import ink from "../images/ink3.jpeg";
import KING from "../images/KING.png";
import mainBoard from "../images/mainBoard2.jpeg";

export const company = {
  name: "OSR Solutions",
  email: "osrsolutions51@gmail.com",
  phone: "+91 9211566451",
  phoneAlt: "+91 9717125351",
  branchPhone: "+91 9085184086",
  hours: "Mon - Sat : 10 AM - 6 PM",
  headOffice:
    "Room no - US14, US COMPLEX , 120 Mathura road , Opp Apollo Hospital , Jasola Vihar , New Delhi - 110076",
  footerOffice:
    "Head Office - First Floor, Room no US - 14, US COMPLEX, 120 Mathura Road, Opp Apollo Hospital, Jasola Vihar, New Delhi",
  branch:
    "Santi Basti, Amsing Jorabat, (Narangi Army Cantt), Guwahati - 781027, ASSAM",
};

export const stats = [
  { num: "500+", label: "Machines Repaired" },
  { num: "1000+", label: "Parts Delivered" },
  { num: "5+", label: "Years Experience" },
  { num: "24/7", label: "Technical Support" },
];

export const heroHighlights = [
  {
    title: "High Precision Printing",
    desc: "Sharp, detailed and consistent output for industrial work.",
  },
  {
    title: "Machine Servicing",
    desc: "Expert repair, maintenance and installation support.",
  },
  {
    title: "Genuine Spare Parts",
    desc: "Print heads, main boards, cables and original spare parts.",
  },
  {
    title: "Reliable Performance",
    desc: "Heavy-duty support for continuous business operations.",
  },
];

export const services = [
  {
    title: "Printing Machines",
    desc: "High-performance industrial printing machines with advanced technology.",
    tag: "Premium Quality",
  },
  {
    title: "Machine Repair",
    desc: "Fast and reliable machine repair with expert technicians.",
    tag: "24/7 Support",
  },
  {
    title: "Spare Parts",
    desc: "Original spare parts to maintain long-term performance.",
    tag: "Genuine Parts",
  },
  {
    title: "Installation",
    desc: "Professional installation and setup for smooth operations.",
    tag: "Fast Setup",
  },
  {
    title: "Technical Support",
    desc: "Complete troubleshooting and maintenance support.",
    tag: "Expert Team",
  },
  {
    title: "Consultation",
    desc: "Get expert advice for choosing the best machine solution.",
    tag: "Business Growth",
  },
];

export const aboutFeatures = [
  {
    title: "Industrial Machines",
    desc: "High-performance printing solutions for businesses.",
  },
  {
    title: "Machine Servicing",
    desc: "Expert repair and maintenance support.",
  },
  {
    title: "Genuine Spare Parts",
    desc: "Premium quality spare parts for long-term performance.",
  },
  {
    title: "Technical Support",
    desc: "Fast and reliable support for machine operations.",
  },
];

export const products = [
  {
    slug: "d602-2h-dtf-printer",
    name: "D602-2H",
    category: "DTF Printers",
    title: "D602-2H DTF Printer",
    shortTitle: "DTF Printer",
    desc: "High-performance DTF printer for sharp, vibrant and reliable production.",
    image: DTF,
    heroImage: D602,
    gallery: [DTF, DTF1, DTF2, D602],
    specs: [
      "High Speed Printing",
      "Auto White Ink Circulation",
      "Industrial Grade Build",
      "600 mm Printing Width",
    ],
    details: [
      "2 x Epson i1600-A1 Print Head",
      "1200 / 1800 / 2400 dpi Resolution",
      "DTF Ink Compatible",
      "Powder Shaking & Drying System",
      "Stable Production Performance",
    ],
    applications: ["PET Film", "Textile", "Apparel", "Merchandise"],
  },
  {
    slug: "kj-1060uc-uv-flatbed-printer",
    name: "KJ-1060UC",
    category: "UV Flatbed Printers",
    title: "KJ-1060UC UV Flatbed Printer",
    shortTitle: "UV Flatbed Printer",
    desc: "High precision UV flatbed printer with advanced features and industrial grade performance.",
    image: flex3,
    heroImage: KING,
    gallery: [flex3, flex2, flex, KING],
    specs: [
      "1050mm Print Width",
      "Epson DX7 Print Head",
      "CMYK/W Color",
      "720 x 2400 DPI",
    ],
    details: [
      "High Precision Print Head",
      "Dual Head Configuration",
      "Automatic Height Detection",
      "UV LED Curing System",
      "Strong Vacuum Table",
    ],
    applications: ["Acrylic", "Wood", "Glass", "Metal", "PVC Board", "Signage"],
  },
  {
    slug: "a3f-4050dx-uv-flatbed-printer",
    name: "A3F-4050DX",
    category: "UV Flatbed Printers",
    title: "A3F-4050DX UV Flatbed Printer",
    shortTitle: "UV Flatbed Printer",
    desc: "Compact UV flatbed printer for multi-material printing and premium-quality output.",
    image: allInOne,
    heroImage: A3F,
    gallery: [allInOne, allInOne1, allInOne2, A3F],
    specs: [
      "High Precision Print Head",
      "Dual Head Configuration",
      "0 - 15 CM Adjustable Height",
      "CMYK + White + Varnish",
    ],
    details: [
      "Epson DX7 Print Head",
      "Up to 720 x 1440 DPI",
      "UV Curable Ink",
      "Multiple File Format Support",
      "Smart Height Detection",
    ],
    applications: ["Phone Case", "Ceramic", "Leather", "Bottle", "Acrylic"],
  },
  {
    slug: "all-in-one-dtf-printer",
    name: "ALL-IN-ONE",
    category: "DTF Printers",
    title: "ALL-IN-ONE DTF Printer",
    shortTitle: "DTF Printer",
    desc: "Integrated DTF solution for smooth production, service and print performance.",
    image: allInOne3,
    heroImage: allInOne4,
    gallery: [allInOne3, allInOne4, allInOne5],
    specs: [
      "Reliable Production",
      "Service Friendly Design",
      "Sharp Color Output",
      "Cost Effective",
    ],
    details: [
      "Stable daily production",
      "Easy maintenance access",
      "Premium quality components",
      "Fast support from OSR Solutions",
    ],
    applications: ["Textile", "Garments", "Custom Printing", "Merchandise"],
  },
  {
    slug: "flatbed-uv-printer",
    name: "Flatbed UV",
    category: "UV Flatbed Printers",
    title: "Flatbed UV Printer",
    shortTitle: "UV Printer",
    desc: "Industrial UV flatbed machine for quality printing on multiple surfaces.",
    image: allInOne6,
    heroImage: allInOne7,
    gallery: [allInOne6, allInOne7, allInOne8],
    specs: [
      "Multi Material Printing",
      "Reliable Performance",
      "UV Curing Output",
      "Industrial Support",
    ],
    details: [
      "Prints on rigid materials",
      "Strong and durable structure",
      "Operator training available",
      "Technical support included",
    ],
    applications: ["Wood", "Acrylic", "Glass", "Metal", "Board"],
  },
  {
    slug: "ploter",
    name: "Ploter",
    category: "Plotters",
    title: "Ploter",
    shortTitle: "Plotter",
    desc: "Large-format printing support for industrial and commercial requirements.",
    image: flex,
    heroImage: flex3,
    gallery: [flex, flex2, flex3],
    specs: [
      "Large Format Output",
      "High Speed Production",
      "Vibrant Color Output",
      "Technical Support",
    ],
    details: [
      "Wide-format printing capability",
      "Business-grade output quality",
      "Maintenance support available",
      "Genuine spare parts support",
    ],
    applications: ["Signage", "Backlit Work", "Display Prints", "Commercial Media"],
  },
  {
    slug: "head-boards",
    name: "Head Boards",
    category: "Spare Parts & Accessories",
    title: "Head Boards",
    shortTitle: "Spare Parts",
    desc: "Genuine head board supply and support for industrial printer reliability.",
    image: head,
    heroImage: head,
    gallery: [head, mainBoard, ink],
    specs: [
      "Genuine Spare Parts",
      "Reliable Compatibility",
      "Expert Installation",
      "Fast Support",
    ],
    details: [
      "Head boards and main boards",
      "Print heads and cables",
      "Motherboard repair support",
      "Long-term performance guidance",
    ],
    applications: ["Printers", "Boards", "Repair", "Maintenance"],
  },
  {
    slug: "technical-support",
    name: "Technical Support",
    category: "Spare Parts & Accessories",
    title: "Technical Support",
    shortTitle: "Support",
    desc: "Complete troubleshooting and maintenance support for machine operations.",
    image: mainBoard,
    heroImage: mainBoard,
    gallery: [mainBoard, head, ink],
    specs: [
      "Expert Technicians",
      "Remote Guidance",
      "On-site Support",
      "Maintenance Help",
    ],
    details: [
      "Machine repair and maintenance",
      "Installation and operator training",
      "Spare part diagnosis",
      "Reliable ongoing support",
    ],
    applications: ["Service", "Repair", "Installation", "Training"],
  },
];

export const samples = [
  {
    title: "UV Printing on Acrylic",
    image: allInOne,
  },
  {
    title: "UV Printing on Wood",
    image: allInOne1,
  },
  {
    title: "UV Printing on Mobile Covers",
    image: allInOne2,
  },
  {
    title: "UV Printing on Bottle",
    image: allInOne5,
  },
  {
    title: "UV Backlit Signage",
    image: flex2,
  },
];

export const productCategories = [
  "All Products",
  "UV Flatbed Printers",
  "DTF Printers",
  "Plotters",
  "Spare Parts & Accessories",
];
