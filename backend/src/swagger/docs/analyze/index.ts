import { type oas31 } from "openapi3-ts";

import { analyzeTextPath } from "./analyzeText.docs";

export const analyzePaths: Record<string, oas31.PathItemObject> = {
  "api/analyze": {
    ...analyzeTextPath,
  },
};
