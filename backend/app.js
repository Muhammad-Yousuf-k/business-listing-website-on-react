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
import search_routes from "./src/routes/search_routes.js";
import form_routes from "./src/routes/form_routes.js";
import csrfProtection from "./src/middlewares/csrf.middleware.js";

import { env } from "./src/config/env.js";
import { notFound } from "./src/middlewares/notFound.middleware.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const app = express();

/* SECURITY */
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(compression());

if (env.nodeEnv === "production") {
    app.set("trust proxy", 1);
}

/* CORS */
const allowedOrigins = [
    env.clientUrl,
    "http://localhost:5173",
].filter(Boolean);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(null, false);
        },
        credentials: true,
    })
);


/* LOGGING */
if (env.nodeEnv === "development") {
    app.use(morgan("dev"));
}

if (env.nodeEnv !== "development") {
    // /* RATE LIMIT */
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
            message: {
                success: false,
                message: "Too many requests, please try again later.",
            },
        })
    );

}

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

app.get("/favicon.ico", (req, res) => res.status(204).end());

/* ROUTES */
app.use("/auth-api", auth_routes);
app.use("/restaurant-api", restaurant_routes);
app.use("/review-api", review_routes);
app.use("/menu-api", menu_routes);
app.use("/search-api", search_routes);
app.use("/form-api", form_routes);

/* ERROR HANDLING */
app.use(notFound);
app.use(errorHandler);

export default app;