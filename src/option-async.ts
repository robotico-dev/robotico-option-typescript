/**
 * Async helpers: mapAsync, bindAsync for Option.
 */

import type { Option } from "./option.js";
import { none, some } from "./option.js";

/**
 * Maps the value if Some using an async mapping; otherwise remains None.
 *
 * @param opt - The option to map
 * @param mapping - Async function from T to TMapped
 * @returns Promise of Some(mapped value) or None
 */
export async function mapAsync<T, TMapped>(
  opt: Option<T>,
  mapping: (value: T) => Promise<TMapped>
): Promise<Option<TMapped>> {
  return opt._tag === "some" ? some(await mapping(opt.value)) : none;
}

/**
 * Binds (flatMap) with an async binding if Some; otherwise remains None.
 *
 * @param opt - The option to bind
 * @param binding - Async function from T to Option<TMapped>
 * @returns Promise of the Option returned by the binding or None
 */
export async function bindAsync<T, TMapped>(
  opt: Option<T>,
  binding: (value: T) => Promise<Option<TMapped>>
): Promise<Option<TMapped>> {
  return opt._tag === "some" ? await binding(opt.value) : none;
}
