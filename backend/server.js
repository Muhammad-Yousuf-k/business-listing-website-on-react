import app from "./app.js";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err.message);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err.message);
      process.exit(1);
    });

  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();