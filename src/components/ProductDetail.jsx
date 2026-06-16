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
import SampleGallery from "./SampleGallery";
import { company, products, samples } from "../data/siteData";
import "./ProductDetail.css";

const detailTabs = ["Overview", "Specifications", "Applications", "Downloads"];

const getFileExtension = (fileUrl) => {
  const cleanUrl = fileUrl.split("?")[0].split("#")[0];
  const extension = cleanUrl.match(/\.([a-z0-9]+)$/i)?.[1];

  return extension || "png";
};

function ProductDetail() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(
    () => products.find((item) => item.slug === productSlug),
    [productSlug]
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Overview");
  const [openTabs, setOpenTabs] = useState(() => ({
    Overview: true,
    Specifications: false,
    Applications: false,
    Downloads: false,
  }));

  const toggleAccordion = (tab) => {
    setOpenTabs((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productSlug]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const brochureFile = product.brochure || product.heroImage;
  const brochureFileName =
    product.brochureFileName || `${product.name}-brochure.${getFileExtension(brochureFile)}`;
  const isWideMachineShowcase = product.slug === "astrojet-g8-eco-solvent-printer";

  const triggerDownload = (downloadUrl, fileName, shouldRevoke = false) => {
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = fileName;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    window.setTimeout(() => {
      link.remove();
      if (shouldRevoke) {
        URL.revokeObjectURL(downloadUrl);
      }
    }, 1200);
  };

  const downloadBrochure = async () => {
    try {
      const response = await fetch(brochureFile, { cache: "force-cache" });
      if (!response.ok) {
        throw new Error("Brochure download failed");
      }

      const fileBlob = await response.blob();
      const downloadBlob = new Blob([fileBlob], { type: "application/octet-stream" });

      if (window.navigator?.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(downloadBlob, brochureFileName);
        return;
      }

      triggerDownload(URL.createObjectURL(downloadBlob), brochureFileName, true);
    } catch (error) {
      triggerDownload(brochureFile, brochureFileName);
    }
  };

  const goToContact = () => {
    navigate("/contact");
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
            <button onClick={() => navigate("/products")}>Products</button>
            <span>/</span>
            <strong>{product.name}</strong>
          </div>

          <div className="detail-grid">
            <div className="detail-gallery reveal">
              <span className="detail-badge">Best Seller</span>
              <div className="detail-image-stage">
                <div className="detail-showcase-effects" aria-hidden="true">
                  <span className="detail-neon-ring" />
                  <span className="detail-neon-ring inner" />
                  <span className="detail-particle particle-a" />
                  <span className="detail-particle particle-b" />
                  <span className="detail-particle particle-c" />
                  <span className="detail-particle particle-d" />
                  <span className="detail-glow-platform" />
                </div>
                <img
                  className={`detail-machine-img${isWideMachineShowcase ? " wide-machine-img" : ""}`}
                  src={gallery[selectedImage]}
                  alt={product.title}
                />
                <img
                  className={`detail-machine-reflection${
                    isWideMachineShowcase ? " wide-machine-reflection" : ""
                  }`}
                  src={gallery[selectedImage]}
                  alt=""
                  aria-hidden="true"
                />
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
                <button className="btn-soft" type="button" onClick={downloadBrochure}>
                  <FiDownload />
                  Download Brochure
                </button>
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

          {/* Desktop tab content (unchanged) */}
          <div className="tab-content desktop-only">
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
                  <button className="btn-soft" type="button" onClick={downloadBrochure}>
                    <FiDownload />
                    Download Brochure
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile accordion: show all headers and allow independent toggling */}
          <div className="accordion mobile-only">
            {detailTabs.map((tab) => (
              <div className="accordion-item" key={tab}>
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion(tab)}
                  aria-expanded={!!openTabs[tab]}
                >
                  <span>{tab}</span>
                  <FiChevronDown className={openTabs[tab] ? "open" : ""} />
                </button>

                <div className={`accordion-panel ${openTabs[tab] ? "open" : ""}`}>
                  {tab === "Overview" && (
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

                  {tab === "Specifications" && (
                    <div className="spec-table">
                      {product.specs.concat(product.details).map((item, index) => (
                        <div key={`${item}-${index}`}>
                          <strong>Feature {index + 1}</strong>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "Applications" && (
                    <div className="application-grid wide">
                      {product.applications.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  )}

                  {tab === "Downloads" && (
                    <div className="download-panel">
                      <p>
                        Download the available product visual or contact our experts
                        for a complete brochure and pricing guidance.
                      </p>
                      <button className="btn-soft" type="button" onClick={downloadBrochure}>
                        <FiDownload />
                        Download Brochure
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
          <SampleGallery samples={samples} gridClassName="sample-row" />
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
