import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiChevronDown,
  FiDownload,
  FiGrid,
  FiPhoneCall,
  FiShield,
  FiTool,
  FiZap,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { company, products, samples } from "../data/siteData";
import "./ProductDetail.css";

const detailTabs = ["Overview", "Specifications", "Applications", "Downloads"];

function ProductDetail() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(
    () => products.find((item) => item.slug === productSlug),
    [productSlug]
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productSlug]);

  if (!product) {
    return <Navigate to="/services" replace />;
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const goToContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 220);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/91${company.phone.replace(/\D/g, "").slice(-10)}`, "_blank");
  };

  const callOffice = () => {
    window.location.href = `tel:${company.phone}`;
  };

  return (
    <>
      <Navbar />
      <main className="product-detail-page">
        <section className="product-detail-hero">
          <div className="detail-breadcrumb">
            <button onClick={() => navigate("/")}>Home</button>
            <span>/</span>
            <button onClick={() => navigate("/services")}>Products</button>
            <span>/</span>
            <strong>{product.name}</strong>
          </div>

          <div className="detail-grid">
            <div className="detail-gallery reveal">
              <span className="detail-badge">Best Seller</span>
              <div className="detail-image-stage">
                <img src={gallery[selectedImage]} alt={product.title} />
              </div>
              <div className="detail-thumbs" aria-label={`${product.title} gallery`}>
                {gallery.map((image, index) => (
                  <button
                    key={`${product.slug}-${index}`}
                    className={selectedImage === index ? "active" : ""}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View ${product.title} image ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-copy reveal">
              <span className="eyebrow">Our Products</span>
              <h1>
                {product.name}
                <span>{product.shortTitle}</span>
              </h1>
              <p>{product.desc}</p>

              <div className="detail-spec-list">
                {product.specs.map((spec) => (
                  <div key={spec}>
                    <FiCheckCircle />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="detail-actions">
                <button className="btn-primary" onClick={goToContact}>
                  <FaWhatsapp />
                  Get a Quote
                  <FiArrowRight />
                </button>
                <a className="btn-soft" href={product.heroImage} download>
                  <FiDownload />
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="detail-feature-strip section-shell">
          {[
            ["High Precision Printing", FiGrid],
            ["Easy to Operate", FiTool],
            ["Low Maintenance", FiZap],
            ["Industrial Grade Performance", FiShield],
          ].map(([label, Icon]) => (
            <div key={label} className="strip-item">
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="detail-tabs section-shell">
          <div className="tab-buttons" role="tablist" aria-label="Product details">
            {detailTabs.map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="tab-content">
            <div className="tab-panel">
              <div className="tab-panel-title">
                <h2>{activeTab}</h2>
                <FiChevronDown />
              </div>

              {activeTab === "Overview" && (
                <div className="overview-grid">
                  <div>
                    <h3>Product Overview</h3>
                    <p>
                      {product.title} is designed for high-quality printing,
                      reliable service operations, and strong business
                      performance with OSR Solutions support.
                    </p>
                    <ul>
                      {product.details.map((item) => (
                        <li key={item}>
                          <FiCheckCircle />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="application-panel">
                    <h3>Perfect For Printing On</h3>
                    <div className="application-grid">
                      {product.applications.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Specifications" && (
                <div className="spec-table">
                  {product.specs.concat(product.details).map((item, index) => (
                    <div key={`${item}-${index}`}>
                      <strong>Feature {index + 1}</strong>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Applications" && (
                <div className="application-grid wide">
                  {product.applications.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              )}

              {activeTab === "Downloads" && (
                <div className="download-panel">
                  <p>
                    Download the available product visual or contact our experts
                    for a complete brochure and pricing guidance.
                  </p>
                  <a className="btn-soft" href={product.heroImage} download>
                    <FiDownload />
                    Download Brochure
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="detail-cta section-shell">
          <div>
            <span className="eyebrow">Need Help Choosing the Right Machine?</span>
            <h2>Our experts are here to help you find the perfect solution.</h2>
          </div>
          <div className="detail-cta-actions">
            <button className="btn-soft" onClick={callOffice}>
              <FiPhoneCall />
              Talk to Expert
            </button>
            <button className="btn-whatsapp" onClick={openWhatsApp}>
              <FaWhatsapp />
              WhatsApp Us
            </button>
          </div>
        </section>

        <section className="detail-samples section-shell">
          <div className="section-heading">
            <span className="eyebrow">Printing Samples</span>
            <h2>See Our Printing Quality</h2>
          </div>
          <div className="sample-row">
            {samples.map((sample) => (
              <figure key={sample.title}>
                <img src={sample.image} alt={sample.title} />
                <figcaption>{sample.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="mobile-action-bar">
          <button onClick={openWhatsApp}>
            <FaWhatsapp />
            WhatsApp
          </button>
          <button onClick={callOffice}>
            <FiPhoneCall />
            Call Us
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetail;
