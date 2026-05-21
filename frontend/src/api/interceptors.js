import api from "./axios";
import { getCsrfToken } from "./csrf";

api.interceptors.request.use((config) => {
  const csrf = getCsrfToken();

  if (csrf) {
    config.headers["X-CSRF-Token"] = csrf;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;