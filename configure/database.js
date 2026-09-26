const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

let db;

try {
    const production = process.env.NODE_ENV === "production";

    if (production) {
        // =========================
        // PRODUCTION - INFINITYFREE
        // =========================
        db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log(
            "Production Avien Database Connected Successfully!".bgCyan
        );
    } else {
        // =========================
        // LOCAL DATABASE
        // =========================
        db = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "video_portfolio",
            port: 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log(
            "Local Database Connected Successfully!".bgCyan
        );
    }
} catch (error) {
    console.log(
        `Database Connection Error! : ${error}`.bgRed
    );
}

module.exports = db;