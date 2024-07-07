import { Request, Response } from "express";
import AnimService from "../services/animService";

export const getAnimation = async (req: Request, res: Response) => {
  try {
    const blockId = req.query.blockId as string;
    const animData = await AnimService.getAnimation(blockId);
    if (animData) {
      console.log("SUCCESS");
      res.json({
        exists: true,
        code: animData.code,
        caption: animData.caption,
      });
    } else {
      res.json({
        exists: false,
        code: "",
        caption: "",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve chat history" });
  }
};

export const generateAnimation = async (req: Request, res: Response) => {
  try {
    const { blockId, selectedText, pageId } = req.body;
    const animCode = await AnimService.generateAnimation(
      blockId,
      selectedText,
      pageId,
    );
    res.json({ exists: true, animCode: animCode });
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
