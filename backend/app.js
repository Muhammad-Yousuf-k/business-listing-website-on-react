import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import auth_routes from "./src/routes/auth.routes.js";
import restaurant_routes from "./src/routes/restaurant.routes.js";
import review_routes from "./src/routes/review.routes.js";
import menu_routes from "./src/routes/menu.routes.js";
import csrfProtection from "./src/middlewares/csrf.middleware.js";

import { env } from "./src/config/env.js";
import { notFound } from "./src/middlewares/notFound.middleware.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const app = express();

/* SECURITY */
app.use(helmet());
app.use(cookieParser());

app.set("trust proxy", 1);

/* CORS */
app.use(
    cors({
        origin: env.clientUrl,
        credentials: true,
    })
);

/* BODY PARSER */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* COMPRESSION */
app.use(compression());

/* LOGGING */
if (env.nodeEnv === "development") {
    app.use(morgan("dev"));
}

// /* RATE LIMIT */
// app.use(
//     rateLimit({
//         windowMs: 15 * 60 * 1000,
//         max: 100,
//         message: "Too many requests, please try again later.",
//     })
// );

/* HEALTH CHECK */
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

app.get("/csrf-token", csrfProtection, (req, res) => {
    res.json({
        csrfToken: req.csrfToken(),
    });
});

/* ROUTES */
app.use("/auth-api", auth_routes);
app.use("/restaurant-api", restaurant_routes);
app.use("/review-api", review_routes);
app.use("/menu-api", menu_routes);

/* ERROR HANDLING */
app.use(notFound);
app.use(errorHandler);

export default app;