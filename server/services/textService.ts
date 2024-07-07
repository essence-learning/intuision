import Anthropic from "@anthropic-ai/sdk";

import Conversation, { IConversation } from "../models/llms/Conversation";

const anthropic = new Anthropic();

//TODO: Implement RAG for this service to improve the answers -- take larger contexts of part of the textbook to cater the explanation to go beyond it?

class TextService {
  constructor() {}

  //TODO: complete this and hook it up to the controller and routes
  async getChatHistory(conversationId: string) {
    try {
      const conversation: IConversation | null =
        await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      } else {
        return conversation.messages;
      }
    } catch (error) {
      console.error("Error querying chat history:", error);
      throw new Error("Failed to retrieve chat history");
    }
  }

  async sendMessage(
    conversationId: string | null,
    message: string,
    selectedText: string | null,
    pageId: string,
  ) {
    console.log("API REQUEST MADE IT!");
    try {
      console.log(conversationId);
      if (!conversationId) {
        console.log("balaoj;asldf");
        // TODO: update system message with context from the pageId / actual page.
        const newConversation = new Conversation({
          systemPrompt:
            selectedText && selectedText.length > 0
              ? `You are a helpful physics assistant ready to answer questions and provide alternate explanations for students. Please respond in english and include any necessary equations in LaTeX. The following conversations may refer to this text that the user selected: ${selectedText}. If they ask a question which appears to lack context, please use this prior text that was just provided. Please do not make any mention of "selected text" to the user.`
              : `You are a helpful physics assistant ready to answer questions and provide alternate explanations for students. Please respond in english and include any necessary equations in LaTeX.`,
          messages: [],
        });
        await newConversation.save();

        //TODO: fix this typescript shit
        conversationId = newConversation._id;
        console.log(newConversation._id);
      }
      console.log(conversationId);
      const conversation: IConversation | null =
        await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      } else {
        //TODO: Decide whether it is better to leave this context here or move it to the system input.
        conversation.addMessage("user", message);

        console.log("Conversation:", conversation.messages);

        const response = await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 1000,
          temperature: 0,
          system: conversation.systemPrompt,
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
