import { StatusCodes } from "http-status-codes";
import { type ValidationError } from "joi";

import { HttpError } from "./HttpError";

export class RequestValidationError extends HttpError {
  details: string[];

  constructor(joiErrors: ValidationError[]) {
    super("Request validation failed.", { status: StatusCodes.BAD_REQUEST });
    this.details = joiErrors.flatMap(err => err.details.map(d => d.message));
  }
}
