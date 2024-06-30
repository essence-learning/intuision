import { Request, Response } from "express";
import TextService from "../services/textService";

// export const getChatHistory = async (req: Request, res: Response) => {
//   try {
//     const conversationId = req.conversationId;
//     const history = await ChatService.getHistory(userId);
//     res.json(history);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve chat history" });
//   }
// };

export const sendMessage = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body);
    const { message, conversationId } = req.body;
    console.log("made it toh here.asdf.");
    const response = await TextService.sendMessage(conversationId, message);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

// export const regenerateResponse = async (req: Request, res: Response) => {
//   try {
//     const { conversationId } = req.body;
//     const response = await TextService.regenerateResponse(conversationId);
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to regenerate response" });
//   }
// };
