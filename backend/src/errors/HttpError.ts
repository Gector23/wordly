import { StatusCodes } from "http-status-codes";

import { cleanStack } from "#utils/errors";

export class HttpError extends Error {
  status: number;
  isOperational: boolean;

  constructor(message: string, options: { status?: number; cause?: unknown } = {}) {
    if (options.cause) {
      cleanStack(options.cause);
    }

    super(message, { cause: options.cause });
    this.status = options.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
    this.isOperational = options.cause === undefined;

    cleanStack(this);
  }
}
