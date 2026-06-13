import { useEffect, useState } from "react";
import axios from "axios";
import { FiLock, FiLogIn, FiMail, FiShield } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { apiUrl } from "../utils/api";
import { getAdminToken, setAdminToken } from "../utils/adminAuth";
import "./AdminLoginPage.css";

function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/admin/reviews";
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Login | OSR Solutions";

    if (getAdminToken()) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, redirectTo]);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
  };

  const submitLogin = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError("Admin email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(apiUrl("/api/admin/login"), {
        email: form.email.trim(),
        password: form.password,
      });

      setAdminToken(response.data.token);
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="admin-login-page">
        <section className="admin-login-card reveal">
          <div className="admin-login-icon">
            <FiShield />
          </div>

          <span className="eyebrow">Secure Admin</span>
          <h1>Review Management Login</h1>
          <p>Sign in to approve or reject customer reviews before they appear on the website.</p>

          <form onSubmit={submitLogin}>
            <div className="admin-login-field">
              <label htmlFor="admin-email">Admin Email</label>
              <div>
                <FiMail />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="admin@example.com"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="admin-login-field">
              <label htmlFor="admin-password">Password</label>
              <div>
                <FiLock />
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={updateForm}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {error && <div className="admin-login-error">{error}</div>}

            <button className="btn-primary" type="submit" disabled={loading}>
              <FiLogIn />
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AdminLoginPage;
