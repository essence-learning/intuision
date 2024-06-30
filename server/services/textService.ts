import Anthropic from "@anthropic-ai/sdk";

import Conversation, { IConversation } from "../models/llms/Conversation";

const anthropic = new Anthropic();

class TextService {
  constructor() {}

  async sendMessage(conversationId: string | null, message: string) {
    console.log("API REQUEST MADE IT!");
    try {
      if (conversationId === null) {
        const newConversation = new Conversation({
          messages: [],
        });
        await newConversation.save();

        //TODO: fix this typescript shit
        conversationId = newConversation._id;
      }
      const conversation: IConversation | null =
        await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      } else {
        conversation.addMessage("user", message);

        console.log("Conversation:", conversation.messages);

        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1000,
          temperature: 0,
          system:
            "You are a helpful physics assistant ready to answer questions and provide alternate explanations for students. Please respond in english and include any necessary equations in LaTeX.",
          messages: conversation.messages.map(({ role, content }) => ({
            role,
            content,
          })),
        });

        const responseMessage =
          response.content[0].type === "text" ? response.content[0].text : "";

        await conversation.addMessage("assistant", responseMessage);

        return { response: responseMessage, conversationId: conversation._id };
      }
    } catch (error) {
      console.error("Error querying Claude:", error);
      throw new Error("Failed to generate response");
    }
  }
}

export default new TextService();

// export async function generateHaiku(): Promise<string> {
//   try {
//     // Dynamically import LlamaAI

//     const response = await anthropic.messages.create({
//       model: "claude-3-opus-20240229",
//       max_tokens: 1000,
//       temperature: 0,
//       system: "Respond only with haiku-style poems.",
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "text",
//               text: "Why is the ocean salty?",
//             },
//           ],
//         },
//       ],
//     });
//     return response.content[0].type === "text" ? response.content[0].text : "";
//   } catch (error) {
//     console.error("Error querying LLM API:", error);
//     throw new Error("Failed to generate haiku");
//   }
// }
