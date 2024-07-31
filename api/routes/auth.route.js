// EXPRESS
import express from "express";
// * CONTROLLERS
import { signup, signin, signout } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signin", signout);

export default router;
