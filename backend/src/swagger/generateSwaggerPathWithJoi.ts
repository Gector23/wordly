import { StatusCodes } from "http-status-codes";
import joiToSwagger from "joi-to-swagger";
import { type oas31 } from "openapi3-ts";

import { type ValidationSchemas } from "#middlewares/validateAndSanitizeRequest.middleware";

interface Options {
  method: "post" | "put" | "patch" | "get" | "delete";
  summary: string;
  description?: string;
  tags?: string[];
  validationSchemas: ValidationSchemas;
  responses?: Record<string, oas31.ResponseObject>;
}

export function generateSwaggerPathWithJoi(options: Options): oas31.PathItemObject {
  const parameters: oas31.ParameterObject[] = [];

  if (options.validationSchemas.query) {
    const { swagger } = joiToSwagger(options.validationSchemas.query);
    if (swagger.type === "object" && swagger.properties) {
      for (const [name, prop] of Object.entries(swagger.properties)) {
        parameters.push({
          name,
          in: "query",
          required: (swagger.required || []).includes(name),
          schema: prop as oas31.SchemaObject,
        });
      }
    }
  }

  if (options.validationSchemas.params) {
    const { swagger } = joiToSwagger(options.validationSchemas.params);
    if (swagger.type === "object" && swagger.properties) {
      for (const [name, prop] of Object.entries(swagger.properties)) {
        parameters.push({
          name,
          in: "path",
          required: true,
          schema: prop as oas31.SchemaObject,
        });
      }
    }
  }

  let requestBody: oas31.RequestBodyObject | undefined;

  if (options.validationSchemas.body) {
    const { swagger } = joiToSwagger(options.validationSchemas.body);
    requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: swagger as oas31.SchemaObject,
        },
      },
    };
  }

  return {
    [options.method]: {
      summary: options.summary,
      description: options.description,
      tags: options.tags,
      parameters,
      requestBody,
      responses: {
        ...options.responses,
        [StatusCodes.BAD_REQUEST]: {
          description: "Request validation failed",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["message", "details"],
                properties: {
                  message: {
                    type: "string",
                    example: "Request validation failed",
                  },
                  details: {
                    type: "array",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}
