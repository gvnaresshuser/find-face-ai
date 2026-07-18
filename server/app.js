import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cloudinary from "./config/cloudinary.js";
import uploadRoutes from "./routes/upload.js";
import photoRoutes from "./routes/photoRoutes.js";
import fs from "fs";
import { generateEmbedding } from "./services/aiService.js";
import searchRoutes from "./routes/search.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//------------------------------
app.use((req, res, next) => {
  console.log("➡️", req.method, req.originalUrl);

  res.on("finish", () => {
    console.log("✅ Response Finished", res.statusCode);
  });

  res.on("close", () => {
    console.log("❌ Connection Closed");
  });

  next();
});
//------------------------------

app.use("/api/upload", uploadRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MomentMatch API Running",
  });
});

//http://localhost:5000/db-test
//[{"now":"2026-07-15T09:27:42.427Z"}]
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json(err.message);
  }
});

//http://localhost:5000/cloudinary-test
//{"status":"ok","rate_limit_allowed":500,"rate_limit_reset_at":"2026-07-15T10:00:00.000Z","rate_limit_remaining":499}
app.get("/cloudinary-test", async (req, res) => {
  const result = await cloudinary.api.ping();

  res.json(result);
});

app.get("/test-ai", async (req, res) => {
  const buffer = fs.readFileSync("./sample.jpg");

  const result = await generateEmbedding(buffer);

  res.json(result);
});

export default app;
