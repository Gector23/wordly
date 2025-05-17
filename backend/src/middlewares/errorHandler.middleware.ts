import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { HttpError } from "#errors/HttpError";
import { RequestValidationError } from "#errors/RequestValidationError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  console.error(`[Error] ${req.method} ${req.url}`, err);

  if (err instanceof RequestValidationError) {
    res.status(err.status).json({
      message: err.message,
      details: err.details,
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message,
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}
