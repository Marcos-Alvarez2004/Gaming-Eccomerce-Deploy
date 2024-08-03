// EXPRESS
import express from "express";
// * CONTROLLER LISTING
import { createListing } from "../controllers/listing.controller.js";
// VERIFY TOKEN
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);

export default router;
