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
import KING from "../images/KING.png";

import UVDTF from "../images/A3F.png";
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
             
            <div className="machine-imgage">
              <img src={UVDTF} alt="UV PRINTING" />
            </div>
            
             
          </div>

          {/* ALL IN ONE DTF */}
          <div className="service-card">
            <img
              src={machineImages1[currentImage1]}
              alt="ALL-IN-ONE DTF"
              className="slider-image"
            />
            <div className="machine-imgage">
              <img src={KING} alt="UV KING" />
            </div>
          </div>

          {/* UV DTF */}
          <div className="service-card">
            <img
              src={machineImages2[currentImage2]}
              alt="UV DTF"
              className="slider-image"
            />

              
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