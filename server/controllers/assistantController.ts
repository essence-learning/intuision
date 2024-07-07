import { Request, Response } from "express";
import TextService from "../services/textService";

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    console.log("SUCCESS");
    const conversationId = req.query.conversationId as string;
    const history = await TextService.getChatHistory(conversationId);
    console.log("SUCCESS");
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve chat history" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, conversationId, selectedText, pageId } = req.body;
    const response = await TextService.sendMessage(
      conversationId,
      message,
      selectedText,
      pageId,
    );
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
