import { describe, expect, it } from "@jest/globals";

import { HttpError } from "#errors/HttpError";
import { cleanStack, wrapError } from "#utils/errors";

describe("Error utils", () => {
  describe("cleanStack", () => {
    it("should clean the stack trace", () => {
      const stackRows = [
        "Error: Test error",
        "    at wrapError (src/utils/errors.ts:1:1)",
        "    at Object.<anonymous> (src/utils/errors.ts:1:1)",
        "    at Object.<anonymous> (node_modules/router/index.js:1:1)",
      ];

      const error = new Error("Test error");
      error.stack = stackRows.join("\n");
      cleanStack(error);
      expect(error.stack).not.toContain("node_modules/router");
      expect(error.stack).not.toContain("wrapError");
      expect(error.stack).toMatchSnapshot();
    });
  });

  describe("wrapError", () => {
    it("should not wrap an operational error", () => {
      const error = new HttpError("Operational error", { status: 400 });
      const wrappedError = wrapError("Wrapped operational error", error);
      expect(wrappedError).toBe(error);
    });

    it("should wrap a non-operational error", () => {
      const error = new Error("Non-operational error");
      const wrappedError = wrapError("Wrapped non-operational error", error);
      expect(wrappedError).toBeInstanceOf(HttpError);
      expect(wrappedError.message).toBe("Wrapped non-operational error");
    });

    it("should wrap a non-error object", () => {
      const error = "Non-error object";
      const wrappedError = wrapError("Wrapped non-error object", error);
      expect(wrappedError).toBeInstanceOf(HttpError);
      expect(wrappedError.message).toBe("Wrapped non-error object");
    });
  });
});
