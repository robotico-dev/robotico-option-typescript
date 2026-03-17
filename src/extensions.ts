/**
 * Extension-style functions: Tap, TapNone, RecoverWith, GetValueOrDefault, ToNullable.
 */

import type { Option } from "./option.js";

/**
 * Runs a side effect when Some; returns the same option.
 *
 * @param opt - The option
 * @param action - Side effect called with the value when Some
 * @returns The same option (for chaining)
 */
export function tap<T>(opt: Option<T>, action: (value: T) => void): Option<T> {
  if (opt._tag === "some") action(opt.value);
  return opt;
}

/**
 * Runs a side effect when None; returns the same option.
 *
 * @param opt - The option
 * @param action - Side effect called when None
 * @returns The same option (for chaining)
 */
export function tapNone<T>(opt: Option<T>, action: () => void): Option<T> {
  if (opt._tag === "none") action();
  return opt;
}

/**
 * Returns this option if Some; otherwise returns the fallback option.
 *
 * @param opt - The option
 * @param fallback - Option to return when opt is None
 * @returns opt if Some, otherwise fallback
 */
export function recoverWith<T>(opt: Option<T>, fallback: Option<T>): Option<T> {
  return opt._tag === "some" ? opt : fallback;
}

/**
 * Returns the value if Some; otherwise undefined.
 * Use getValueOr(opt, default) when you need a definite T.
 *
 * @param opt - The option to read
 * @returns The inner value or undefined
 */
export function getValueOrDefault<T>(opt: Option<T>): T | undefined {
  return opt._tag === "some" ? opt.value : undefined;
}

/**
 * Converts to nullable: Some(value) → value, None → null.
 *
 * @param opt - The option to convert
 * @returns The inner value or null
 */
export function toNullable<T>(opt: Option<T>): T | null {
  return opt._tag === "some" ? opt.value : null;
}
