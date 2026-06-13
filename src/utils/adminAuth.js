export const ADMIN_TOKEN_KEY = "osr_admin_token";

export const getAdminToken = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(ADMIN_TOKEN_KEY) || "";
};

export const setAdminToken = (token) => {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const adminAuthHeaders = () => {
  const token = getAdminToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};
