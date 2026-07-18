import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { searchSelfie } from "../controllers/searchController.js";

const router = express.Router();

router.post(
  "/selfie",
  upload.single("photo"),
  searchSelfie
);

export default router;