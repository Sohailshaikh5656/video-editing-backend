const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const cors = require("cors")
const multer = require("multer")
const app = express()
const path = require('path');
app.use(express.json()) //Comment if Cloudnairy
dotenv.config()
app.use(cors({
    // origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    origin: "*",
}));

//For Cloudnariy to Convert Response in JOSN
// const jsonParser = express.json({ limit: "50mb" });
// const textParser = express.text({ limit: "50mb" });

// app.use((req, res, next) => {
//   const contentType = req.headers["content-type"] || "";

//   if (contentType.startsWith("text/plain")) {
//     console.log("Text Plain Middleware Triggered");
//     return textParser(req, res, next);
//   }

//   if (contentType.startsWith("application/json") || contentType.startsWith("multipart/form-data")) {
//     console.log("JSON Middleware Triggered");
//     return jsonParser(req, res, next);
//   }

//   return next();
// });


// cron.schedule("* * * * *", () => {
    //   console.log("🚀 Cron Job Running every 1 minute...");
    //   // yaha tu apna fetch + AI process call karega
//     // });
app.use(require('./middleware/validation').validateHeaderToken);
// app.use(require('./middleware/validation').extractHeaderLanguage);
app.use(require('./middleware/validation').validateApiKey);
// app.use(require('./middleware/validation').DecriptData);
let app_routing = require("./modules/app_routing")
app_routing.v1(app)
app.use("/uploads",express.static(path.join(__dirname,'uploads')));
try{
    app.listen(process.env.PORT || 3300,"0.0.0.0",()=>{ //Network
    // app.listen(process.env.PORT || 3300,()=>{ //Localhost
        console.log(`App Started on ${process.env.PORT || 3300} PORT`.bgGreen)
    })
}catch(error){
    console.log(`Error in Server : ${error}`.bgRed.white)
}