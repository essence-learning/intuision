import express from "express";
import {
  editAnimation,
  generateAnimation,
  getAnimation,
} from "../controllers/animController";

const router = express.Router();

router.post("/retrieve", getAnimation);
// router.post("/generate", generateAnimation);
router.post("/edit", editAnimation);

export default router;
