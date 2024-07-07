import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for the Anim document
export interface IAnim extends Document {
  name: string;
  caption: string;
  blockId: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for the Anim model
export interface IAnimModel extends Model<IAnim> {
  findByBlockId(blockId: string): Promise<IAnim | null>;
}

// Define the Anim schema
const AnimSchema = new Schema<IAnim>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    blockId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create indexes (if needed)
// AnimSchema.index({ code: 1 }, { unique: true });

// Add any instance methods
// AnimSchema.methods.getInfo = function (this: IAnim): string {
//   return `Anim: ${this.name} (Code: ${this.code})`;
// };

// Add any static methods
AnimSchema.statics.findByBlockId = function (
  blockId: string,
): Promise<IAnim | null> {
  return this.findOne({ blockId });
};

// Create and export the model
const Anim = mongoose.model<IAnim, IAnimModel>("Anim", AnimSchema);

export default Anim;
