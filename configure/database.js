const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
require("colors");

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const config = isProduction
    ? {
          // PRODUCTION - AIVEN MYSQL
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
          ssl: { rejectUnauthorized: false }, // Aiven needs SSL. Use { ca: process.env.DB_CA } for stricter security
      }
    : {
          // LOCAL DATABASE
          host: "localhost",
          user: "root",
          password: "",
          database: "video_portfolio",
          port: 3306,
      };

const db = mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    connectTimeout: 20000,
});

// createPool() does not connect by itself, so test the connection here
(async () => {
    try {
        await db.query("SELECT 1");
        console.log(
            `${isProduction ? "Production Aiven" : "Local"} Database Connected Successfully!`.bgCyan
        );
    } catch (error) {
        console.log(`Database Connection Error! : ${error.message}`.bgRed);
    }
})();

module.exports = db;