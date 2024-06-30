import mongoose, { Document, Schema } from "mongoose";

//TODO: do we have to have some more designations for what type of conversaton it is?
interface IMessage {
  role: "user" | "assistant";
  content: string;
}

// Define the structure for the conversation document
export interface IConversation extends Document {
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
  addMessage(
    role: "user" | "assistant",
    content: string,
  ): Promise<IConversation>;
}

// Create the schema for the Conversation model
const ConversationSchema: Schema = new Schema(
  {
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This will automatically update the updatedAt field
  },
);

// Method to add new messages to the conversation
ConversationSchema.methods.addMessage = function (
  role: "user" | "assistant",
  content: string,
) {
  this.messages.push({ role, content });
  return this.save();
};

// Create and export the Mongoose model
export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema,
);
