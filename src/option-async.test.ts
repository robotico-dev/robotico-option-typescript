import { describe, it, expect } from "vitest";
import { mapAsync, bindAsync } from "./option-async.js";
import { none, some, isSome } from "./option.js";

describe("option-async", () => {
  describe("mapAsync", () => {
    it("Some maps with async", async () => {
      const result = await mapAsync(some(1), async (x) => x + 1);
      expect(isSome(result)).toBe(true);
      if (isSome(result)) expect(result.value).toBe(2);
    });
    it("None stays None", async () => {
      const result = await mapAsync(none, async (x: number) => x);
      expect(result).toEqual(none);
    });
  });

  describe("bindAsync", () => {
    it("Some binds with async", async () => {
      const result = await bindAsync(some(1), async (x) => some(x + 1));
      expect(isSome(result)).toBe(true);
      if (isSome(result)) expect(result.value).toBe(2);
    });
    it("None stays None", async () => {
      const result = await bindAsync(none, async (x: number) => some(x));
      expect(result).toEqual(none);
    });
  });
});
