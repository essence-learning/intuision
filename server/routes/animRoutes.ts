import express from "express";
import { generateAnimation, getAnimation } from "../controllers/animController";

const router = express.Router();

router.post("/retrieve", getAnimation);
// router.post("/generate", generateAnimation);
// router.post("/edit", generateAnimation);

export default router;
