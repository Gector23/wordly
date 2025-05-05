import mongoose, { Schema } from "mongoose";

export interface WordTranslationModel {
  value: string;
  original: string;
  sentence: string;
}

const WordTranslationSchema = new Schema<WordTranslationModel>({
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

export interface WordModel {
  lemma: string;
  translations: WordTranslationModel[];
  addedAt: Date;
}

const WordSchema = new Schema<WordModel>({
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

export default mongoose.model<WordModel>("Word", WordSchema);
