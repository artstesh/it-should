import { SingleParamFunc } from "./utils/verify.func";
import { GeneralVerifier } from "./general.verifier";

/**
 * An inspector responsible for a string verifications
 */
export class StringVerifier extends GeneralVerifier<string | null | undefined> {
  constructor(entry: string | null | undefined) {
    super(entry);
  }

  /**
   * Makes sure that the examined string has zero-length
   * @throws {@link ShouldError} if the string is not empty.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  empty = (): StringVerifier => this.hasLength(0);

  /**
   * Makes sure that the examined string contains only spaces or empty
   * @throws {@link ShouldError} if the string contains other characters.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  whitespace = (): StringVerifier =>
    this.manage(
      this.checkDefined() && this.entry?.replaceAll(' ', '')?.length === 0,
      `'${this.entry} 'is not whitespace.`,
    );

  /**
   * Makes sure that the examined string has no lowercase characters
   * @throws {@link ShouldError} if the string has any lowercase character.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  upperCased = (): StringVerifier =>
    this.manage(
      this.checkDefined() && this.entry === this.entry?.toUpperCase(),
      `'${this.entry}' is not uppercased.`,
      !this.entry?.replaceAll(' ', ''),
    );

  /**
   * Makes sure that the examined string has no uppercase characters
   * @throws {@link ShouldError} if the string has any uppercase character.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  lowerCased = (): StringVerifier =>
    this.manage(
      this.checkDefined() && this.entry === this.entry?.toLowerCase(),
      `'${this.entry} 'is not lowercased.`,
      !this.entry?.replaceAll(' ', ''),
    );

  /**
   * Makes sure that the length of the string is as expected
   * @param expected The expected length
   * @throws {@link ShouldError} if the string has any uppercase character.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  hasLength = (expected: number): StringVerifier =>
    this.manage(
      this.checkDefined() && this.entry?.length === expected,
      `'${this.entry}' doesn't equal expected length ${expected}.`,
    );

  /**
   * Makes sure that the examined string has the same content as the expected one, case-sensitive.
   * @param expected The expected content of the string
   * @throws {@link ShouldError} if the string has different content.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  equals = (expected: string | null | undefined): StringVerifier =>
    this.manage(this.checkDefined() && this.entry === expected, `'${this.entry}' doesn't equal ${expected}.`);

  /**
   * Makes sure that the examined string has the same content as the expected one, ignoring case.
   * @param expected The expected content of the string
   * @throws {@link ShouldError} if the string has different content.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  equalsIgnoreCase = (expected: string | null | undefined): StringVerifier =>
    this.manage(this.entry?.toUpperCase() === expected?.toUpperCase(), `'${this.entry}' doesn't equal ${expected}.`);

  /**
   * Makes sure that the examined string contains the expected one, case-sensitive.
   * @param expected The expected part of the string
   * @param counter A function that defines the number of times the string contains the expected one.
   * @throws {@link ShouldError} if the string doesn't contain the expected one the defined number of times.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  contains(expected: string, counter?: SingleParamFunc<number>): void {
    const count = (this.entry?.split(expected)?.length ?? 0) - 1;
    const error = `'${this.entry}' doesn't contain '${expected}' expected number of times.`;
    this.manage(!!counter ? counter(count) : count > 0, error);
  }

  /**
   * Makes sure that the examined string contains the expected one, ignoring case.
   * @param expected The expected part of the string
   * @param counter A function that defines the number of times the string contains the expected one.
   * @throws {@link ShouldError} if the string doesn't contain the expected one the defined number of times.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  containsIgnoreCase(expected: string, counter?: SingleParamFunc<number>): void {
    const count = (this.entry?.toUpperCase()?.split(expected?.toUpperCase())?.length ?? 0) - 1;
    const error = `'${this.entry}' doesn't contain '${expected}' expected number of times.`;
    this.manage(!!counter ? counter(count) : count > 0, error);
  }

  /**
   * Makes sure that the examined string contains one of the expected, case-sensitive.
   * @param expected The expected part of the string
   * @throws {@link ShouldError} if the string doesn't contain any of the expected the defined number of times.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  containsAny(...expected: string[]): void {
    let found = 0;
    if (!!this.entry) found = expected.map((e) => this.entry?.indexOf(e) !== -1).filter((e) => e)?.length ?? 0;
    this.manage(found > 0, `'${this.entry}' doesn't contain any of [${expected.join(',')}].`);
  }

  /**
   * Makes sure that the examined string contains one of the expected, ignoring case.
   * @param expected The expected part of the string
   * @throws {@link ShouldError} if the string doesn't contain any of the expected the defined number of times.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  containsAnyIgnoreCase(...expected: string[]): void {
    let found = 0;
    if (!!this.entry)
      found =
        expected.map((e) => this.entry?.toUpperCase().indexOf(e.toUpperCase()) !== -1).filter((e) => e)?.length ?? 0;
    this.manage(found > 0, `'${this.entry}' doesn't contain any of [${expected.join(',')}].`);
  }
}
