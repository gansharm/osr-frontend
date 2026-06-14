import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCpu,
  FiGrid,
  FiHeadphones,
  FiPrinter,
  FiSettings,
  FiShield,
  FiTool,
} from "react-icons/fi";
import { products, samples, services } from "../data/siteData";
import SampleGallery from "./SampleGallery";
import "./Services.css";

const serviceIcons = [FiPrinter, FiTool, FiGrid, FiSettings, FiHeadphones, FiCpu];

function Services() {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 4);

  return (
    <section id="services" className="svc-bg">
      <div className="svc-shell">
        <div className="svc-head reveal">
          <span className="eyebrow">Our Services</span>
          <h2>
            Complete Printing
            <span>Solutions</span>
          </h2>
          <p className="sec-sub">
            We provide premium industrial printing machines, installation, servicing, technical
            support, and genuine spare parts for seamless business operations.
          </p>
        </div>

        <div className="svc-grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <article className="svc-card reveal" key={service.title}>
                <div className="svc-icon">
                  <Icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span>{service.tag}</span>
              </article>
            );
          })}
        </div>

        <div className="product-section">
          <div className="section-heading">
            <span className="eyebrow">Our Products</span>
            <h2>
              Advanced Printing
              <span>Machines</span>
            </h2>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <article className="product-card reveal" key={product.slug}>
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <h3>{product.name}</h3>
                <strong>{product.shortTitle}</strong>
                <ul>
                  {product.specs.slice(0, 3).map((spec) => (
                    <li key={spec}>
                      <FiShield />
                      {spec}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate(`/products/${product.slug}`)}>
                  View Details
                  <FiArrowRight />
                </button>
              </article>
            ))}
          </div>

          <button className="view-all" onClick={() => navigate("/products")}>
            View All Products
            <FiArrowRight />
          </button>
        </div>

        <div id="gallery" className="sample-section">
          <div className="section-heading">
            <span className="eyebrow">Featured Work</span>
            <h2>
              Our Latest Printing
              <span>Work</span>
            </h2>
          </div>

          <SampleGallery
            samples={samples}
            gridClassName="sample-grid"
            cardClassName="sample-card"
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
