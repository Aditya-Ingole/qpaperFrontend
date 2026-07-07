import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "https://qpaper.runasp.net/api",
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5100/api",
});

// ✅ Attach JWT automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle expired token globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;