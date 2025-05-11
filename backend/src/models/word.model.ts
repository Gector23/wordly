import { type Word, type WordTranslation } from "@wordly/shared";
import mongoose, { Schema } from "mongoose";

const WordTranslationSchema = new Schema<WordTranslation>({
  value: {
    type: String,
    required: true,
  },
  original: {
    type: String,
    required: true,
  },
  sentence: {
    type: String,
    required: true,
  },
});

const WordSchema = new Schema<Word>({
  lemma: {
    type: String,
    required: true,
    unique: true,
  },
  translations: [WordTranslationSchema],
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<Word>("Word", WordSchema);
