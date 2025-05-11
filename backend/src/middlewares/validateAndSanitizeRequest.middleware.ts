import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { type ValidationError, type ObjectSchema } from "joi";

export interface ValidationSchemas {
  params?: ObjectSchema;
  query?: ObjectSchema;
  body?: ObjectSchema;
}

export const validateAndSanitizeRequest = (schema: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationErrors: ValidationError[] = [];

    for (const key of ["body", "query", "params"] as const) {
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
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Request validation failed",
        details: validationErrors,
      });
      return;
    }

    next();
  };
};
