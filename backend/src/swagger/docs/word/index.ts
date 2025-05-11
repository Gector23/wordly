import { type oas31 } from "openapi3-ts";

import { addTranslationPath } from "./addTranslation.docs";

export const wordPaths: Record<string, oas31.PathItemObject> = {
  "api/words/translations": {
    ...addTranslationPath,
  },
};
