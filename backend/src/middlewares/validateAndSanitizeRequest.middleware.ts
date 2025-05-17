import { type Request, type Response, type NextFunction } from "express";
import { type ValidationError, type ObjectSchema } from "joi";

import { RequestValidationError } from "#errors/RequestValidationError";

export interface ValidationSchemas {
  params?: ObjectSchema;
  query?: ObjectSchema;
  body?: ObjectSchema;
}

export const validateAndSanitizeRequest = (schema: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const validationErrors: ValidationError[] = [];

    for (const key of ["params", "query", "body"] as const) {
      if (schema[key]) {
        const { error, value } = schema[key].validate(req[key], {
          abortEarly: false,
          stripUnknown: true,
          convert: true,
        });

        if (error) {
          validationErrors.push(error);
          continue;
        }

        req[key] = value;
      }
    }

    if (validationErrors.length > 0) {
      next(new RequestValidationError(validationErrors));
      return;
    }

    next();
  };
};
