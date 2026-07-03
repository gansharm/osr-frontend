import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServicePage from "./components/ServicePage";
import ProductDetail from "./components/ProductDetail";
import ReviewsPage from "./components/ReviewsPage";
import AdminReviewsPage from "./components/AdminReviewsPage";
import AdminLoginPage from "./components/AdminLoginPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ExhibitionPage from "./components/ExhibitionPage";

function HomePage({ scrollTarget }) {
  useEffect(() => {
    if (!scrollTarget) return undefined;

    const timeout = window.setTimeout(() => {
      document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
    }, 160);

    return () => window.clearTimeout(timeout);
  }, [scrollTarget]);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <ContactUs />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<HomePage scrollTarget="about" />}
        />

        <Route
          path="/services"
          element={<HomePage scrollTarget="services" />}
        />

        <Route
          path="/gallery"
          element={<HomePage scrollTarget="gallery" />}
        />

        <Route
          path="/contact"
          element={<HomePage scrollTarget="contact" />}
        />

        <Route
          path="/products"
          element={<ServicePage />}
        />

        <Route
          path="/products/:productSlug"
          element={<ProductDetail />}
        />

        <Route
          path="/reviews"
          element={<ReviewsPage />}
        />

        <Route
          path="/exhibition"
          element={<ExhibitionPage />}
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedAdminRoute>
              <AdminReviewsPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/login"
          element={<AdminLoginPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
