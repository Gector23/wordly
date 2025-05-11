import { type OpenAPIObject } from "openapi3-ts/oas31";

import { analyzePaths } from "./docs/analyze";
import { wordPaths } from "./docs/word";

export const openApiDocument: OpenAPIObject = {
  openapi: "3.1.0",
  info: {
    title: "Wordly API",
    version: "0.0.1",
  },
  paths: {
    ...analyzePaths,
    ...wordPaths,
  },
};
