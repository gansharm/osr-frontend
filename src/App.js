import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";import Footer from "./components/Footer";
import { BrowserRouter,Routes,Route } from "react-router-dom";   
import ServicePage from "./components/ServicePage";
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

        {/* Home */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Services Page */}
        <Route
          path="/services"
          element={<ServicePage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;