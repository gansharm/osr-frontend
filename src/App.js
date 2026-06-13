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

function HomePage() {
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
          path="/services"
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
