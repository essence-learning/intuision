import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

// const msg =
// console.log(msg);

// import dotenv from "dotenv";
// import { LlamaAI } from "llamaai";

// // Load environment variables from .env file
// dotenv.config();
// const apiToken = process.env.API_TOKEN || "";

// let llamaAPI: LlamaAI;

// const api_request_json = {
//   model: "llama3-70b",
//   messages: [
//     {
//       role: "system",
//       content:
//         "You are an experienced poet who writes only one poem when requested, with no additional text explaining the poem.",
//     },
//     { role: "user", content: "Write me a haiku!" },
//   ],
// };

export async function generateHaiku(): Promise<string> {
  try {
    // Dynamically import LlamaAI

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system: "Respond only with short poems.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Why is the ocean salty?",
            },
          ],
        },
      ],
    });
    return response.content[0].type === "text" ? response.content[0].text : "";
  } catch (error) {
    console.error("Error querying LLM API:", error);
    throw new Error("Failed to generate haiku");
  }
}
