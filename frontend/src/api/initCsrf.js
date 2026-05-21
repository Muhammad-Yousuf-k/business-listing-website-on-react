import api from "./interceptors";
import { setCsrfToken } from "./csrf";

export const initCsrf = async () => {
  const res = await api.get("/csrf-token");
  setCsrfToken(res.data.csrfToken);
};