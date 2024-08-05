// EXPRESS
import express from "express";
// * CONTROLLER LISTING
import {
  createListing,
  deleteListing,
} from "../controllers/listing.controller.js";
// VERIFY TOKEN
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
