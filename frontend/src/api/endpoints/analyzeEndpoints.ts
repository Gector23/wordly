import { api } from "..";
import { type MatchedLemma } from "../../types/lemma.types";

interface AnalyzeRequest {
  text: string;
}

interface AnalyzeResponse {
  matchedLemmas: MatchedLemma[];
}

const analyzeEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    analyze: builder.mutation<AnalyzeResponse, AnalyzeRequest>({
      query: (body) => ({
        url: "/analyze",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAnalyzeMutation } = analyzeEndpoints;
