import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { apiUrl } from "../utils/api";
import { adminAuthHeaders, clearAdminToken, getAdminToken } from "../utils/adminAuth";

function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;
    const token = getAdminToken();

    if (!token) {
      setChecking(false);
      setAllowed(false);
      return undefined;
    }

    const verifySession = async () => {
      try {
        await axios.get(apiUrl("/api/admin/me"), {
          headers: adminAuthHeaders(),
        });

        if (mounted) {
          setAllowed(true);
        }
      } catch (error) {
        clearAdminToken();

        if (mounted) {
          setAllowed(false);
        }
      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    };

    verifySession();

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return (
      <main className="admin-auth-loading">
        Checking admin session...
      </main>
    );
  }

  if (!allowed) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedAdminRoute;
