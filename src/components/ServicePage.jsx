import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiPhoneCall,
  FiPrinter,
  FiShield,
  FiSliders,
  FiTool,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { company, productCategories, products, samples } from "../data/siteData";
import featuredMachine from "../images/A3F-4050DX.png";
import heroMachine from "../images/D602-2H.png";
import "./ServicePage.css";

function ServicePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [currentImage, setCurrentImage] = useState(0);

  const featuredProduct = products.find(
    (product) => product.slug === "a3f-4050dx-uv-flatbed-printer"
  );

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All Products") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getImage = (product) => {
    const gallery = product.gallery?.length ? product.gallery : [product.image];
    return gallery[currentImage % gallery.length];
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

      <main className="service-page">
        <section className="products-hero">
          <div className="products-hero-copy reveal">
            <span className="eyebrow">Our Products</span>
            <h1>
              Industrial Printing
              <span>Machines</span>
            </h1>
            <p>
              BYHX Machine Parts, Main Boards, Ink Heads, Motherboard Repair, Technical Support &
              Spare Parts.
            </p>
            <div className="products-hero-badges">
              <span>
                <FiPrinter />
                High Precision
              </span>
              <span>
                <FiShield />
                Reliable Performance
              </span>
              <span>
                <FiTool />
                Best in Class Service
              </span>
            </div>
          </div>

          <div className="products-hero-machine reveal">
            <div className="machine-showcase" aria-hidden="true">
              <span className="showcase-ring" />
              <span className="showcase-ring secondary" />
              <span className="showcase-particle particle-one" />
              <span className="showcase-particle particle-two" />
              <span className="showcase-particle particle-three" />
              <span className="showcase-particle particle-four" />
              <span className="showcase-platform" />
            </div>
            <img src={heroMachine} alt="D602-2H machine" />
          </div>
        </section>

        <section className="category-tabs" aria-label="Product categories">
          {productCategories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="featured-product reveal">
          <div className="featured-copy">
            <span className="eyebrow">Featured Product</span>
            <h2>
              {featuredProduct.name}
              <span>{featuredProduct.shortTitle}</span>
            </h2>
            <p>{featuredProduct.desc}</p>
            <div className="featured-specs">
              {featuredProduct.specs.map((spec) => (
                <span key={spec}>
                  <FiCheckCircle />
                  {spec}
                </span>
              ))}
            </div>
            <button
              className="btn-primary"
              onClick={() => navigate(`/products/${featuredProduct.slug}`)}
            >
              View Details
              <FiArrowRight />
            </button>
          </div>

          <div className="featured-image">
            <div className="featured-machine-stage" aria-hidden="true">
              <span className="featured-ring" />
              <span className="featured-ring inner" />
              <span className="featured-orb orb-one" />
              <span className="featured-orb orb-two" />
              <span className="featured-orb orb-three" />
              <span className="featured-platform" />
            </div>
            <img src={featuredMachine} alt="A3F-4050DX machine" />
          </div>

          <div className="featured-metrics">
            {featuredProduct.specs.slice(0, 4).map((spec) => (
              <div key={spec}>
                <FiSliders />
                <strong>{spec.split(" ")[0]}</strong>
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="browse-products">
          <div className="section-heading">
            <span className="eyebrow">Browse Products</span>
            <h2>
              Our Printing
              <span>Machines</span>
            </h2>
          </div>

          <div className="browse-grid">
            {visibleProducts.map((product) => (
              <article className="browse-card reveal" key={product.slug}>
                <div className="browse-img">
                  <img src={getImage(product)} alt={product.title} />
                </div>
                <div className="browse-copy">
                  <h3>{product.name}</h3>
                  <strong>{product.shortTitle}</strong>
                  <ul>
                    {product.specs.slice(0, 3).map((spec) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                  <button onClick={() => navigate(`/products/${product.slug}`)}>
                    View Details
                    <FiArrowRight />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button className="view-all bottom" onClick={() => setActiveCategory("All Products")}>
            View All Products
            <FiArrowRight />
          </button>
        </section>

        <section className="quality-section" id="gallery">
          <div className="section-heading">
            <span className="eyebrow">Printing Samples</span>
            <h2>
              See Our Printing
              <span>Quality</span>
            </h2>
          </div>
          <div className="quality-grid">
            {samples.map((sample) => (
              <figure key={sample.title}>
                <div className="sample-media">
                  <img src={sample.image} alt={sample.title} />
                </div>
                <figcaption>{sample.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
 
        <section className="products-help">
          <div>
            <FiPrinter />
          </div>
          <div>
            <h2>Need Help Choosing the Right Machine?</h2>
            <p>Our experts are here to help you find the perfect solution.</p>
          </div>
          <button className="btn-soft" onClick={callOffice}>
            <FiPhoneCall />
            Call Us Now
          </button>
          <button className="btn-whatsapp" onClick={openWhatsApp}>
            <FaWhatsapp />
            WhatsApp Us
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ServicePage;
