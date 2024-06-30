import express from "express";
import { sendMessage } from "../controllers/assistantController";

const router = express.Router();

//TODO: implement chat history retrieval

router.post("/send", sendMessage);

export default router;
