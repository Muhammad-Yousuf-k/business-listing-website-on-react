import axios from "axios";
import env from "../config/env";

const api = axios.create({
  baseURL: env.vite_api_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;