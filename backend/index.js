import express from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import orderRoute from "./routes/order.route.js";

import config from "./config.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ CORS Configuration
const allowedOrigins = [config.frontendUrl]; 

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman / server-side requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle OPTIONS preflight for all routes
app.options("*", (req, res) => {
  const origin = req.headers.origin; // browser origin
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // single origin
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});


const port = config.port || 4002;
const DB_URL = config.mongoUrl;

try {
  await mongoose.connect(DB_URL);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/order", orderRoute);

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});