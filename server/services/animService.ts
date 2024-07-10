import Anthropic from "@anthropic-ai/sdk";

import Anim, { IAnim } from "../models/Anim";
import fs from "fs";
import path from "path";

const anthropic = new Anthropic();

const ANIMATION_PROMPT = fs.readFileSync(
  path.join(__dirname, "animation_prompt.txt"),
  "utf-8",
);

class AnimService {
  constructor() {}

  async getAnimation(blockId: string) {
    try {
      const anim: IAnim | null = await Anim.findByBlockId(blockId);
      if (!anim) {
        return null;
      } else {
        return { code: anim.code, caption: anim.caption, orbit: anim.orbit };
      }
    } catch (error) {
      console.error("Error querying animation:", error);
      throw new Error("Failed to retrieve animation");
    }
  }

  //TODO: saving to database doesn't work...
  async generateAnimation(
    blockId: string,
    selectedText: string,
    pageId: string,
  ) {
    try {
      const anim = new Anim({
        blockId: blockId,
        name: "",
        caption: "",
        code: "",
        orbit: true,
      });

      const response1 = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        temperature: 0,
        system:
          "You are an experienced physics diagram maker who uses Three.js.",
        messages: [
          {
            role: "user",
            content: `${ANIMATION_PROMPT} ${selectedText}. Thanks!`,
          },
        ],
      });

      const response1Text =
        response1.content[0].type === "text" ? response1.content[0].text : "";

      console.log(response1Text);

      anim.orbit = response1Text.includes("NO ORBIT CONTROLS");
      anim.code =
        response1Text.match(
          /\/\/THREE.JS CODE HERE\s*([\s\S]*?)\s*\/\/END OF THREE.JS CODE/,
        )?.[1] || "";

      //TODO: perhaps another API call to get caption summary (could use cheaper model)
      // anim.caption =
      //   response1Text.match(
      //     /\/\/<CAPTION>\s*([\s\S]*?)\s*\/\/<CAPTION>/,
      //   )?.[1] || "";
      // anim.name = anim.caption;

      anim.caption = "LeBron James";
      anim.name = "LeBron James";

      console.log(anim.name);
      console.log(anim.code);
      console.log(anim.orbit);
      console.log(anim.caption);

      await anim.save();
      return { code: anim.code, caption: anim.caption, orbit: anim.orbit };
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
        max_tokens: 4000,
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
