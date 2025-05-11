import { type AnalyzeTextRequest, type AnalyzeTextResponse } from "@wordly/shared";

import { api } from "..";

const analyzeEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    analyze: builder.mutation<AnalyzeTextResponse, AnalyzeTextRequest>({
      query: body => ({
        url: "/analyze",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAnalyzeMutation } = analyzeEndpoints;
