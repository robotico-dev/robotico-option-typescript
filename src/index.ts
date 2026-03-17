/**
 * @robotico/option — Option (Maybe) type for TypeScript: Some(value) | None.
 * Aligned with Robotico.Option (C#) and dev.robotico.option (Kotlin).
 *
 * Exports: Option type; some/none, isSome/isNone, tryGetValue; match, map, bind;
 * getValueOr/getValueOrElse, fromNullable; tap, tapNone, recoverWith, getValueOrDefault,
 * toNullable; mapAsync, bindAsync.
 *
 * @packageDocumentation
 */

export type { Option } from "./option.js";
export {
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

export {
  tap,
  tapNone,
  recoverWith,
  getValueOrDefault,
  toNullable,
} from "./extensions.js";

export { mapAsync, bindAsync } from "./option-async.js";
