import { describe, it, expect } from "vitest";
import {
  none,
  some,
  isSome,
  isNone,
  tryGetValue,
  match,
  map,
  bind,
  getValueOr,
  getValueOrElse,
  fromNullable,
} from "./option.js";

describe("Option", () => {
  describe("some / none", () => {
    it("some(value) returns Some", () => {
      const opt = some(42);
      expect(opt._tag).toBe("some");
      expect(opt.value).toBe(42);
    });
    it("some(null) and some(undefined) throw", () => {
      expect(() => some(null)).toThrow(/non-null/);
      expect(() => some(undefined)).toThrow(/non-null/);
    });
    it("none is frozen and has _tag none", () => {
      expect(none._tag).toBe("none");
    });
  });

  describe("isSome / isNone", () => {
    it("isSome(some(x)) is true, isNone is false", () => {
      const opt = some(1);
      expect(isSome(opt)).toBe(true);
      expect(isNone(opt)).toBe(false);
    });
    it("isNone(none) is true, isSome is false", () => {
      expect(isNone(none)).toBe(true);
      expect(isSome(none)).toBe(false);
    });
  });

  describe("tryGetValue", () => {
    it("Some returns [true, value]", () => {
      const [ok, v] = tryGetValue(some(10));
      expect(ok).toBe(true);
      expect(v).toBe(10);
    });
    it("None returns [false, undefined]", () => {
      const [ok, v] = tryGetValue(none);
      expect(ok).toBe(false);
      expect(v).toBeUndefined();
    });
  });

  describe("match", () => {
    it("Some runs someHandler", () => {
      expect(
        match(
          some(5),
          (x) => x + 1,
          () => 0
        )
      ).toBe(6);
    });
    it("None runs noneHandler", () => {
      expect(
        match(
          none,
          (x) => x,
          () => 99
        )
      ).toBe(99);
    });
  });

  describe("map", () => {
    it("Some maps value", () => {
      expect(map(some(3), (x) => x * 2)).toEqual(some(6));
    });
    it("None stays None", () => {
      expect(map(none, (x: number) => x)).toEqual(none);
    });
  });

  describe("bind", () => {
    it("Some binds", () => {
      expect(bind(some(2), (x) => some(x + 1))).toEqual(some(3));
      expect(bind(some(2), () => none)).toEqual(none);
    });
    it("None stays None", () => {
      expect(bind(none, (x: number) => some(x))).toEqual(none);
    });
  });

  describe("getValueOr", () => {
    it("Some returns value", () => {
      expect(getValueOr(some(7), 0)).toBe(7);
    });
    it("None returns default", () => {
      expect(getValueOr(none, 0)).toBe(0);
    });
  });

  describe("getValueOrElse", () => {
    it("Some returns value without calling factory", () => {
      const factory = () => {
        throw new Error("should not run");
      };
      expect(getValueOrElse(some(7), factory)).toBe(7);
    });
    it("None returns factory result", () => {
      expect(getValueOrElse(none, () => 99)).toBe(99);
    });
  });

  describe("fromNullable", () => {
    it("null/undefined -> None", () => {
      expect(fromNullable(null)).toEqual(none);
      expect(fromNullable(undefined)).toEqual(none);
    });
    it("value -> Some(value)", () => {
      expect(fromNullable(0)).toEqual(some(0));
      expect(fromNullable("")).toEqual(some(""));
    });
  });
});
