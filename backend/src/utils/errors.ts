import { HttpError } from "#errors/HttpError";

export const cleanStack = (err: unknown) => {
  if (err instanceof Error && err.stack) {
    err.stack = err.stack
      .split("\n")
      .filter(line => !line.includes("node_modules/router") && !line.includes("wrapError"))
      .join("\n");
  }
};

export const wrapError = (message: string, err: unknown) => {
  if (err instanceof HttpError && err.isOperational) {
    return err;
  }

  if (err instanceof Error) {
    return new HttpError(message, { cause: err });
  }

  return new HttpError(message);
};
