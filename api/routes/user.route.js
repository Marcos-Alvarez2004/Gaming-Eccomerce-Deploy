// EXPRESS
import express from "express";
// * CONTROLLERS USERS
import { updateUser, deleteUser } from "../controllers/user.controller.js";
// VERIFYTOKEN
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
