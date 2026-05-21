import app from "./app.js";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err);

      server.close(() => {
        process.exit(1);
      });
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Closing server.");

      server.close(() => {
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("DB Connection Failed:", error);
    process.exit(1);
  }
};

startServer();