import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

// Create and export db connection
export const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    port: 5432,
    password: process.env.DATABASE_PASSWORD,
    max: 150,
    min: 0
});

// Import middleware
// const checkAuth = require("./middleware/check-auth");

// Import routes
const userRoutes = require("./routes/user-routes");
const teamRoutes = require("./routes/team-routes");
const playerRoutes = require("./routes/player-routes");
const gameRoutes = require("./routes/game-routes");
const searchRoutes = require("./routes/search-routes");
const favoritesRoutes = require("./routes/favorites-routes");

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

// Route handlers
app.use("/nba/teams", teamRoutes);
app.use("/nba/players", playerRoutes);
app.use("/nba/games", gameRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/search", searchRoutes);
app.use("/user", userRoutes);

// Error handling middleware
app.use((error: { message: string; code: number }, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || "Something went wrong!" });
});

// Export Express API as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
