const isLocalHost = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
};

export const API_BASE_URL = isLocalHost()
  ? "http://localhost:5000"
  : "https://osr-solutions.onrender.com";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
