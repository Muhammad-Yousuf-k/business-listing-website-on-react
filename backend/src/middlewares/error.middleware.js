import { env } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    status: statusCode < 500 ? "fail" : "error",
    message: err.message || "Internal Server Error",
  };

  if (env.nodeEnv === "development") {
    response.stack = err.stack;
    console.log("errorHandler:", response.message);
    console.log("errorHandler:", response);
  }

  res.status(statusCode).json(response);
};