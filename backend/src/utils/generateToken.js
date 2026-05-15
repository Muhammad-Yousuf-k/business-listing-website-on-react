import jwt from "jsonwebtoken";
import { env } from "../config/env.js"; // or process.env

const generateToken = (id) => {
  return jwt.sign({ id }, env.jwtSecret, {
    expiresIn: "7d",
  });
};

export default generateToken;