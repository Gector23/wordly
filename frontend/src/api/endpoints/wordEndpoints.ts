import { type AddTranslationRequest } from "@wordly/shared";

import { api } from "..";

const wordEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    addTranslation: builder.mutation<void, AddTranslationRequest>({
      query: body => ({
        url: "/word/translation",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddTranslationMutation } = wordEndpoints;
