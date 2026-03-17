/**
 * Option functor and monad laws.
 */

import { describe, it, expect } from "vitest";
import type { Option } from "./option.js";
import { none, some, map, bind, match, getValueOr } from "./option.js";

const id = <T>(x: T): T => x;
const double = (n: number): number => n * 2;
const addOne = (n: number): number => n + 1;

describe("Option functor laws", () => {
  describe("identity", () => {
    it("map(opt, id) === opt for Some", () => {
      const opt = some(42);
      expect(map(opt, id)).toEqual(opt);
    });
    it("map(none, id) === none", () => {
      expect(map(none, id)).toEqual(none);
    });
  });

  describe("composition", () => {
    it("map(map(opt, f), g) === map(opt, x => g(f(x))) for Some", () => {
      const opt = some(5);
      const composed = (x: number) => addOne(double(x));
      expect(map(map(opt, double), addOne)).toEqual(map(opt, composed));
    });
    it("map(map(none, f), g) === none", () => {
      const opt: Option<number> = none;
      expect(map(map(opt, double), addOne)).toEqual(none);
    });
  });
});

describe("Option monad laws", () => {
  describe("left identity", () => {
    it("bind(some(v), some) === some(v)", () => {
      const v = 10;
      expect(bind(some(v), some)).toEqual(some(v));
    });
  });

  describe("left zero", () => {
    it("bind(none, some) === none", () => {
      expect(bind(none, (x: number) => some(x))).toEqual(none);
    });
  });

  describe("right identity", () => {
    it("bind(some(v), x => some(x)) === some(v)", () => {
      const v = 7;
      expect(bind(some(v), (x) => some(x))).toEqual(some(v));
    });
  });

  describe("composition", () => {
    const f = (n: number) => (n > 0 ? some(n * 2) : none);
    const g = (n: number) => (n % 2 === 0 ? some(n + 1) : none);
    it("bind(bind(opt, f), g) === bind(opt, x => bind(f(x), g)) for Some", () => {
      const opt = some(3);
      const left = bind(bind(opt, f), g);
      const right = bind(opt, (x) => bind(f(x), g));
      expect(left).toEqual(right);
    });
    it("bind(none, f) then bind(_, g) === bind(none, x => bind(f(x), g))", () => {
      const opt: Option<number> = none;
      const left = bind(bind(opt, f), g);
      const right = bind(opt, (x) => bind(f(x), g));
      expect(left).toEqual(right);
      expect(left).toEqual(none);
    });
  });
});

describe("Option match / getValueOr equivalence", () => {
  it("match(opt, id, () => defaultVal) === getValueOr(opt, defaultVal) for Some", () => {
    const opt = some(42);
    const defaultVal = 0;
    expect(
      match(
        opt,
        (x) => x,
        () => defaultVal
      )
    ).toBe(getValueOr(opt, defaultVal));
    expect(
      match(
        opt,
        (x) => x,
        () => defaultVal
      )
    ).toBe(42);
  });
  it("match(opt, id, () => defaultVal) === getValueOr(opt, defaultVal) for None", () => {
    const opt: Option<number> = none;
    const defaultVal = 99;
    expect(
      match(
        opt,
        (x) => x,
        () => defaultVal
      )
    ).toBe(getValueOr(opt, defaultVal));
    expect(
      match(
        opt,
        (x) => x,
        () => defaultVal
      )
    ).toBe(99);
  });
});
