import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ServicePage.css";
import DTF_LOGO from "../images/DTF.png"
function ServicePage() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <div className="service-page">

        <h1>
          Our Products
        </h1>

        <p>
          BYHX Machine Parts,
          Main Boards, Ink Heads,
          Motherboard Repair,
          Technical Support &
          Spare Parts.
        </p>

        <div className="service-grid">

          <div className="service-card">
            <img
              src={DTF_LOGO}
              alt="Machine"
            />
            <h3>
              Printing Machines
            </h3>
          </div>

          <div className="service-card">
            <img
              src="/images/mainboard.jpg"
              alt="Board"
            />
            <h3>
              Main Boards
            </h3>
          </div>

          <div className="service-card">
            <img
              src="/images/inkhead.jpg"
              alt="Ink Head"
            />
            <h3>
              Ink Heads
            </h3>
          </div>

          <div className="service-card">
            <img
              src="/images/repair.jpg"
              alt="Repair"
            />
            <h3>
              Motherboard Repair
            </h3>
          </div>

          <div className="service-card">
            <img
              src="/images/headboard.jpg"
              alt="Head Board"
            />
            <h3>
              Head Boards
            </h3>
          </div>

          <div className="service-card">
            <img
              src="/images/support.jpg"
              alt="Support"
            />
            <h3>
              Technical Support
            </h3>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default ServicePage;