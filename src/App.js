import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServicePage from "./components/ServicePage";
import ProductDetail from "./components/ProductDetail";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
