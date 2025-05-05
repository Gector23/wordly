import { api } from "..";

interface AnalyzeRequest {
  lemma: string;
  original: string;
  translation: string;
  sentence: string;
}

const wordEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    addTranslation: builder.mutation<void, AnalyzeRequest>({
      query: (body) => ({
        url: "/word/translation",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddTranslationMutation } = wordEndpoints;
