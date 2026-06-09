import { useState, useEffect } from "react";

import DTF1 from "../images/DTF.png";
import DTF2 from "../images/DTF1.png";
import DTF3 from "../images/DTF2.png";

import ALLINONE from "../images/ALL-IN-ONE.png";
import ALLINONE1 from "../images/ALL-IN-ONE1.png";
import ALLINONE2 from "../images/ALL-IN-ONE2.png";
import ALLINONE3 from "../images/ALL-IN-ONE3.png";
import ALLINONE4 from "../images/ALL-IN-ONE4.png";
import ALLINONE5 from "../images/ALL-IN-ONE5.png";
import ALLINONE6 from "../images/ALL-IN-ONE6.png";
import ALLINONE7 from "../images/ALL-IN-ONE7.png";
import ALLINONE8 from "../images/ALL-IN-ONE8.png";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ServicePage.css";

function ServicePage() {

  const machineImages = [DTF1, DTF2, DTF3];

  const machineImages1 = [
    ALLINONE,
    ALLINONE1,
    ALLINONE2
  ];

  const machineImages2 = [
    ALLINONE3,
    ALLINONE4,
    ALLINONE5
  ];

  const machineImages3 = [
    ALLINONE6,
    ALLINONE7,
    ALLINONE8
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [currentImage1, setCurrentImage1] = useState(0);
  const [currentImage2, setCurrentImage2] = useState(0);
  const [currentImage3, setCurrentImage3] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % machineImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [machineImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage1((prev) => (prev + 1) % machineImages1.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [machineImages1.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage2((prev) => (prev + 1) % machineImages2.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [machineImages2.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage3((prev) => (prev + 1) % machineImages3.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [machineImages3.length]);

  return (
    <>
      <Navbar />

      <div className="service-page">

        <h1>Our Products</h1>

        <p>
          BYHX Machine Parts,
          Main Boards,
          Ink Heads,
          Motherboard Repair,
          Technical Support &
          Spare Parts.
        </p>

        <div className="service-grid">

          {/* DTF */}
          <div className="service-card">
            <img
              src={machineImages[currentImage]}
              alt="DTF"
              className="slider-image"
            />
            <h3>DTF</h3>
            <p>High-performance industrial DTF printer designed for fast, vibrant, and durable textile printing. Ideal for custom t-shirts, garments, promotional products, and bulk production.</p>

            <h3>Key Features</h3>
            <p>ulHigh-Speed DTF Printing <br />
                Vibrant CMYK + White Ink Output <br />
                Automatic Film Feeding System <br />
Precision Print Head Technology <br />
Stable Industrial Design <br />
Low Maintenance Operation <br />
High Resolution Printing <br />
Suitable for Cotton, Polyester & Mixed Fabrics <br />
Bulk Production Ready <br />
User-Friendly Touch Screen Interface</p>

<h1>Technical Specifications</h1>

<p>Printing Technology: DTF (Direct To Film) <br />
Ink Type: CMYK + White Pigment Ink <br />
Print Resolution: Up to 1440 DPI<br />
Media Type: PET Film<br />
Print Width: 60 cm (Approx.)<br />
Color Configuration: CMYK + White<br />
Operating System: Windows Compatible<br />
Application: T-Shirts, Hoodies, Caps, Bags, Textile Products<br />
Production Type: Industrial & Commercial</p>
          </div>

          {/* ALL IN ONE DTF */}
          <div className="service-card">
            <img
              src={machineImages1[currentImage1]}
              alt="ALL-IN-ONE DTF"
              className="slider-image"
            />
            <h3>ALL-IN-ONE DTF</h3>
          </div>

          {/* UV DTF */}
          <div className="service-card">
            <img
              src={machineImages2[currentImage2]}
              alt="UV DTF"
              className="slider-image"
            />

            <h3>A3F-4050 DX UV DTF Printer</h3>

            <p>
              Dual Epson DX7 Heads | 2400 DPI |
              CMYK + White + Varnish + Gold Varnish |
              Up to 300mm Print Width |
              Dual UV LED Curing |
              0.8–1.2 m²/hr Print Speed
            </p>
            <p>Technical Specifications
Model: A3F-4050 DX
Print Heads: Dual Epson DX7
Technology: Piezoelectric Inkjet
Print Size: Up to 300 mm
Media Thickness: Up to 15 mm
Ink Type: CMYK + White + Varnish + Gold Varnish
Resolution: Up to 2400 DPI
Speed: 0.8–1.2 m²/hr
UV Curing: Dual UV LED Lamps
Interface: USB 2.0
Power: 220V AC, 850W
Machine Size: 860 × 900 × 570 mm
Weight: 100 kg</p>
          </div>

          {/* Flatbed UV */}
          <div className="service-card">
            <img
              src={machineImages3[currentImage3]}
              alt="Flatbed UV Printer"
              className="slider-image"
            />
            <h3>Heat Press</h3>
          </div>

          <div className="service-card">
            <img
              src="/images/headboard.jpg"
              alt="Head Board"
            />
            <h3>Head Boards</h3>
          </div>

          <div className="service-card">
            <img
              src="/images/support.jpg"
              alt="Support"
            />
            <h3>Technical Support</h3>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ServicePage;