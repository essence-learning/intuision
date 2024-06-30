import express from "express";
import {
  sendMessage,
  getChatHistory,
} from "../controllers/assistantController";

const router = express.Router();

//TODO: implement chat history retrieval

router.post("/send", sendMessage);
router.get("/history", getChatHistory);

export default router;
