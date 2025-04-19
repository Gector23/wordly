import mongoose, { Schema } from "mongoose";

export interface ILemmaModel {
  value: string;
  translations: string[];
  addedAt: Date;
}

const LemmaSchema = new Schema<ILemmaModel>({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  translations: {
    type: [String],
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ILemmaModel>("Lemma", LemmaSchema);
