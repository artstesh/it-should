import { SingleParamFunc } from './utils/verify.func';
import { GeneralVerifier } from './general.verifier';
import { StringError } from '../errors/string.error';

/**
 * An inspector responsible for a string verifications
 */
export class StringVerifier extends GeneralVerifier<string | null | undefined> {
  constructor(entry: string | null | undefined, protected errorManager: StringError) {
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
    this.manage(this.checkDefined() && this.entry?.replaceAll(' ', '')?.length === 0, (d) =>
      this.errorManager.whitespace(this.entry, d),
    );

  /**
   * Makes sure that the examined string has no lowercase characters
   * @throws {@link ShouldError} if the string has any lowercase character.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  upperCased = (): StringVerifier =>
    this.manage(
      this.checkDefined() && this.entry === this.entry?.toUpperCase(),
      (d) => this.errorManager.upperCased(this.entry, d),
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
      (d) => this.errorManager.lowerCased(this.entry, d),
      !this.entry?.replaceAll(' ', ''),
    );

  /**
   * Makes sure that the length of the string is as expected
   * @param expected The expected length
   * @throws {@link ShouldError} if the string has any uppercase character.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  hasLength = (expected: number): StringVerifier =>
    this.manage(this.checkDefined() && this.entry?.length === expected, (d) =>
      this.errorManager.hasLength(expected, this.entry?.length, d),
    );

  /**
   * Makes sure that the examined string has the same content as the expected one, case-sensitive.
   * @param expected The expected content of the string
   * @throws {@link ShouldError} if the string has different content.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  equals = (expected: string | null | undefined): StringVerifier =>
    this.manage(this.checkDefined() && this.entry === expected, (d) =>
      this.errorManager.equals(expected, this.entry, d),
    );

  /**
   * Makes sure that the examined string has the same content as the expected one, ignoring case.
   * @param expected The expected content of the string
   * @throws {@link ShouldError} if the string has different content.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  equalsIgnoreCase = (expected: string | null | undefined): StringVerifier =>
    this.manage(this.entry?.toUpperCase() === expected?.toUpperCase(), (d) =>
      this.errorManager.equalsIgnoreCase(expected, this.entry, d),
    );

  /**
   * Makes sure that the examined string contains the expected one, case-sensitive.
   * @param expected The expected part of the string
   * @param counter A function that defines the number of times the string contains the expected one.
   * @throws {@link ShouldError} if the string doesn't contain the expected one the defined number of times.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  contains(expected: string, counter?: SingleParamFunc<number>): void {
    this.checkDefined();
    const count = (this.entry?.split(expected)?.length ?? 0) - 1;
    const error = (d: boolean) => this.errorManager.contains(expected, this.entry, d);
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
    this.checkDefined();
    const count = (this.entry?.toUpperCase()?.split(expected?.toUpperCase())?.length ?? 0) - 1;
    const error = (d: boolean) => this.errorManager.containsIgnoreCase(expected, this.entry, d);
    this.manage(!!counter ? counter(count) : count > 0, error);
  }

  /**
   * Makes sure that the examined string contains one of the expected, case-sensitive.
   * @param expected The expected part of the string
   * @throws {@link ShouldError} if the string doesn't contain any of the expected the defined number of times.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  containsAny(...expected: string[]): void {
    this.checkDefined();
    let found = 0;
    if (!!this.entry) found = expected.map((e) => this.entry?.indexOf(e) !== -1).filter((e) => e)?.length ?? 0;
    this.manage(found > 0, (d) => this.errorManager.containsAny(this.entry, d));
  }

  /**
   * Makes sure that the examined string contains one of the expected, ignoring case.
   * @param expected The expected part of the string
   * @throws {@link ShouldError} if the string doesn't contain any of the expected the defined number of times.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  containsAnyIgnoreCase(...expected: string[]): void {
    this.checkDefined();
    let found = 0;
    if (!!this.entry)
      found =
        expected.map((e) => this.entry?.toUpperCase().indexOf(e.toUpperCase()) !== -1).filter((e) => e)?.length ?? 0;
    this.manage(found > 0, (d) => this.errorManager.containsAnyIgnoreCase(this.entry, d));
  }

  /**
   * Makes sure that the examined string matches the expected expression.
   * @param exp A regular expression object
   * @throws {@link ShouldError} if the string doesn't match the expected expression.
   * @throws {@link ShouldError} if the string is not defined regardless the presence/absence of not() function.
   */
  match(exp: string | RegExp): void {
    this.checkDefined();
    this.manage(!!this.entry?.match(exp), (d) => this.errorManager.match(this.entry, exp, d));
  }
}
