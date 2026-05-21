import csrf from "csurf";
import { env } from "../config/env.js";

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "none",
  },
});

export default csrfProtection;