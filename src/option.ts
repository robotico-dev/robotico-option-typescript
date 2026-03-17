/**
 * Option (Maybe) type: Some(value) | None. Immutable; use Map, Bind, Match to transform.
 * Aligned with Robotico.Option (C#) and dev.robotico.option (Kotlin).
 *
 * @typeParam T - The type of the value when Some
 */
export type Option<T> =
  | { readonly _tag: "some"; readonly value: T }
  | { readonly _tag: "none" };

/** None (no value). Single shared instance. */
export const none: Option<never> = Object.freeze({ _tag: "none" });

/**
 * Wraps a non-null value as Some(value). Throws if value is null or undefined.
 * Use none or fromNullable for optional inputs.
 *
 * @param value - Non-null, non-undefined value to wrap
 * @returns Some(value)
 * @throws Error when value is null or undefined
 */
export function some<T>(value: T): Option<T> {
  if (value == null)
    throw new Error(
      "Option.some requires a non-null value; use none or fromNullable for optional values."
    );
  return Object.freeze({ _tag: "some", value });
}

/**
 * Type guard: true if option is Some.
 *
 * @param opt - The option to test
 * @returns true if opt is Some(value)
 */
export function isSome<T>(opt: Option<T>): opt is { _tag: "some"; value: T } {
  return opt._tag === "some";
}

/**
 * Type guard: true if option is None.
 *
 * @param opt - The option to test
 * @returns true if opt is None
 */
export function isNone<T>(opt: Option<T>): opt is { _tag: "none" } {
  return opt._tag === "none";
}

/**
 * Returns [true, value] if Some; otherwise [false, undefined].
 * Use for destructuring when you need both the flag and the value.
 *
 * @param opt - The option to read
 * @returns [true, value] for Some, [false, undefined] for None
 */
export function tryGetValue<T>(opt: Option<T>): [true, T] | [false, undefined] {
  if (opt._tag === "some") return [true, opt.value];
  return [false, undefined];
}

/**
 * Pattern match: runs someHandler(value) if Some, else noneHandler().
 *
 * @param opt - The option to match
 * @param someHandler - Called with the value when Some
 * @param noneHandler - Called when None
 * @returns The result of the handler that ran
 */
export function match<T, TResult>(
  opt: Option<T>,
  someHandler: (value: T) => TResult,
  noneHandler: () => TResult
): TResult {
  return opt._tag === "some" ? someHandler(opt.value) : noneHandler();
}

/**
 * Map the value if Some; otherwise remain None.
 *
 * @param opt - The option to map
 * @param mapping - Function from T to TMapped
 * @returns Some(mapping(value)) or None
 */
export function map<T, TMapped>(
  opt: Option<T>,
  mapping: (value: T) => TMapped
): Option<TMapped> {
  return opt._tag === "some" ? some(mapping(opt.value)) : none;
}

/**
 * Bind (flatMap): if Some, apply binding and return its Option; otherwise remain None.
 *
 * @param opt - The option to bind
 * @param binding - Function from T to Option<TMapped>
 * @returns The result of binding(value) or None
 */
export function bind<T, TMapped>(
  opt: Option<T>,
  binding: (value: T) => Option<TMapped>
): Option<TMapped> {
  return opt._tag === "some" ? binding(opt.value) : none;
}

/**
 * Returns the value if Some; otherwise the given default (evaluated eagerly).
 * Use when the default is cheap or already computed.
 *
 * @param opt - The option to read
 * @param defaultValue - Value to return when None
 * @returns The inner value or defaultValue
 */
export function getValueOr<T>(opt: Option<T>, defaultValue: T): T {
  return opt._tag === "some" ? opt.value : defaultValue;
}

/**
 * Returns the value if Some; otherwise the result of the factory (evaluated only when None).
 * Use when the default is expensive or has side effects.
 *
 * @param opt - The option to read
 * @param factory - Function called when None to produce a value
 * @returns The inner value or factory()
 */
export function getValueOrElse<T>(opt: Option<T>, factory: () => T): T {
  return opt._tag === "some" ? opt.value : factory();
}

/**
 * Creates Option from nullable: null/undefined → None, value → Some(value).
 *
 * @param value - A value that may be null or undefined
 * @returns None if value is null/undefined, otherwise Some(value)
 */
export function fromNullable<T>(value: T | null | undefined): Option<T> {
  return value == null ? none : some(value);
}
