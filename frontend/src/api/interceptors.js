import api from "./axios";
import { toast } from "react-toastify";
import { getCsrfToken } from "./csrf";

let isSessionToastShown = false;
let hasCheckedAuth = false;

/* mark auth checked from AuthProvider */
export const markAuthChecked = () => {
  hasCheckedAuth = true;
};

/* REQUEST INTERCEPTOR (CSRF HERE) */
api.interceptors.request.use((config) => {
  const csrf = getCsrfToken();

  if (csrf) {
    config.headers["X-CSRF-Token"] = csrf;
  }

  return config;
});

/* RESPONSE INTERCEPTOR (SESSION HANDLING) */
api.interceptors.response.use(
  (response) => response,
  (error) => {

    return Promise.reject(error);
  }
);

export default api;