const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();
const database = require("./configure/database");

app.use(express.json()); // Comment if Cloudinary
app.use(cors({ origin: "*" }));

// =========================
// HEALTH CHECK (public, before auth middleware)
// =========================
app.get("/health", async (req, res) => {
    let conn;
    try {
        conn = await Promise.race([
            database.getConnection(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("DB connect timeout")), 8000)
            ),
        ]);
        await conn.query("SELECT 1");

        res.status(200).json({
            status: "ok",
            database: "connected",
            uptime: Math.round(process.uptime()),
            time: new Date().toISOString(),
        });
    } catch (error) {
        console.error(`[HEALTH] DB check failed: ${error.message}`.bgRed);
        res.status(500).json({
            status: "error",
            database: "disconnected",
            time: new Date().toISOString(),
        });
    } finally {
        if (conn) conn.release();
    }
});

// =========================
// MIDDLEWARE
// =========================
app.use(require("./middleware/validation").validateHeaderToken);
// app.use(require("./middleware/validation").extractHeaderLanguage);
app.use(require("./middleware/validation").validateApiKey);
// app.use(require("./middleware/validation").DecriptData);

// =========================
// ROUTES
// =========================
const app_routing = require("./modules/app_routing");
app_routing.v1(app);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// IN-APP DB PING (only works while Render is awake;
// the external cron is what keeps Render itself awake)
// =========================
async function checkDatabaseHealth() {
    try {
        await database.query("SELECT 1");
        console.log(`[DB] ${new Date().toISOString()} : connected`.bgCyan);
    } catch (error) {
        console.error(`[DB] Connection Failed : ${error.message}`.bgRed);
    }
}
setInterval(checkDatabaseHealth, 5 * 60 * 1000);

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3300;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`App Started on ${PORT} PORT`.bgGreen);
});