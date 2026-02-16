import axios from "axios";

// Use /api so Vite proxy (dev) forwards to backend. Set VITE_API_URL in production.
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const isAdminRoute = window.location.pathname.startsWith("/admin");
      if (isAdminRoute && !window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      } else if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
