import Anthropic from "@anthropic-ai/sdk";

import Anim, { IAnim } from "../models/Anim";

const anthropic = new Anthropic();

const ANIMATION_PROMPT =
  "You are a helpful physics assistant who provides visual aids for students. You are well-versed in react-three-fiber, a web framework for generating interactive animation scenes, and thus you will use use react three fiber to generate an interactive animation scene pertaining to the following queries.";

class AnimService {
  constructor() {}

  async getAnimation(blockId: string) {
    try {
      const anim: IAnim | null = await Anim.findByBlockId(blockId);
      if (!anim) {
        return null;
      } else {
        return { code: anim.code, caption: anim.caption };
      }
    } catch (error) {
      console.error("Error querying animation:", error);
      throw new Error("Failed to retrieve animation");
    }
  }

  async generateAnimation(
    blockId: string,
    selectedText: string,
    pageId: string,
  ) {
    try {
      const anim = new Anim({
        blockId,
        name: "",
        caption: "",
        code: "",
      });

      const code = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        temperature: 0,
        system: ANIMATION_PROMPT,
        messages: [
          {
            role: "user",
            content: `Please generate an anmiation to help me understand ${selectedText}`,
          },
        ],
      });

      await anim.save();
      return { code: anim.code, caption: anim.caption };
    } catch (error) {
      console.error("Error generating animation:", error);
      throw new Error("Failed to generate animation");
    }
  }

  async editAnimation(blockId: string, editText: string, pageId: string) {
    try {
      const initCode = this.getAnimation(blockId);
      const newCode = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        temperature: 0,
        system: ANIMATION_PROMPT,
        messages: [
          {
            role: "user",
            content: `Please edit the following react-three-fiber scene: ${initCode} to better align with ${editText}`,
          },
        ],
      });
    } catch (error) {
      console.error("Error generating animation:", error);
      throw new Error("Failed to generate animation");
    }
  }
}

export default new AnimService();
