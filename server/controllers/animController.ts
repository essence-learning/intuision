import { Request, Response } from "express";
import AnimService from "../services/animService";

export const getAnimation = async (req: Request, res: Response) => {
  try {
    const { blockId, selectedText, pageId } = req.body;
    const animData = await AnimService.getAnimation(blockId);
    if (animData) {
      console.log("SUCCESS");
      res.json({
        exists: true,
        code: animData.code,
        caption: animData.caption,
        orbit: animData.orbit,
      });
    } else {
      const genData = await AnimService.generateAnimation(
        blockId,
        selectedText,
        pageId,
      );
      res.json({
        exists: genData.code.length > 0,
        code: genData.code,
        caption: genData.caption,
        orbit: genData.orbit,
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
    res.json({
      exists: true,
      animCode: animCode,
      caption: animCode.caption,
      orbit: animCode.orbit,
    });
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
