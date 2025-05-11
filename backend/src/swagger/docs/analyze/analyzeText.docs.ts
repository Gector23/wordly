import { StatusCodes } from "http-status-codes";

import { generateSwaggerPathWithJoi } from "#swagger/generateSwaggerPathWithJoi";
import { analyzeTextSchema } from "#validation/analyze.schemas";

export const analyzeTextPath = generateSwaggerPathWithJoi({
  method: "post",
  summary: "Analyze text",
  description: "Analyzes the given text and returns the analysis results",
  tags: ["Analyze"],
  validationSchemas: analyzeTextSchema,
  responses: {
    [StatusCodes.OK]: {
      description: "Text analysis results",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              processedWords: {
                type: "array",
                items: {
                  type: "object",
                  required: ["original", "lemma", "isStopWord", "known"],
                  properties: {
                    original: { type: "string", example: "Balls" },
                    lemma: { type: "string", example: "ball" },
                    isStopWord: { type: "boolean" },
                    known: { type: "boolean" },
                    translations: {
                      type: "array",
                      items: {
                        type: "object",
                        required: ["value", "original", "sentence"],
                        properties: {
                          value: { type: "string", example: "Мяч" },
                          original: { type: "string", example: "Balls" },
                          sentence: { type: "string", example: "Balls are round." },
                        },
                      },
                    },
                    addedAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
