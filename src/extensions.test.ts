import { describe, it, expect, vi } from "vitest";
import {
  tap,
  tapNone,
  recoverWith,
  getValueOrDefault,
  toNullable,
} from "./extensions.js";
import { none, some } from "./option.js";

describe("extensions", () => {
  describe("tap", () => {
    it("runs action when Some and returns same option", () => {
      const fn = vi.fn();
      const opt = some(1);
      expect(tap(opt, fn)).toBe(opt);
      expect(fn).toHaveBeenCalledWith(1);
    });
    it("does not run action when None", () => {
      const fn = vi.fn();
      tap(none, fn);
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe("tapNone", () => {
    it("runs action when None", () => {
      const fn = vi.fn();
      tapNone(none, fn);
      expect(fn).toHaveBeenCalled();
    });
    it("does not run action when Some", () => {
      const fn = vi.fn();
      tapNone(some(1), fn);
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe("recoverWith", () => {
    it("Some returns self", () => {
      const opt = some(1);
      expect(recoverWith(opt, some(2))).toBe(opt);
    });
    it("None returns fallback", () => {
      const fallback = some(2);
      expect(recoverWith(none, fallback)).toBe(fallback);
    });
  });

  describe("getValueOrDefault", () => {
    it("Some returns value", () => {
      expect(getValueOrDefault(some(1))).toBe(1);
    });
    it("None returns undefined", () => {
      expect(getValueOrDefault(none)).toBeUndefined();
    });
  });

  describe("toNullable", () => {
    it("Some returns value", () => {
      expect(toNullable(some(1))).toBe(1);
    });
    it("None returns null", () => {
      expect(toNullable(none)).toBe(null);
    });
  });
});
