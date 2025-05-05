import { api } from "..";
import { type ProcessedWord } from "../../types/word.types";

interface AnalyzeRequest {
  text: string;
}

interface AnalyzeResponse {
  processedWords: ProcessedWord[];
}

const analyzeEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    analyze: builder.mutation<AnalyzeResponse, AnalyzeRequest>({
      query: body => ({
        url: "/analyze",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAnalyzeMutation } = analyzeEndpoints;
