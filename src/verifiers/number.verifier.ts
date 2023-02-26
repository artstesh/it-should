import { GeneralVerifier } from "./general.verifier";
import { NumberError } from "../errors/number.error";

/**
 * An inspector responsible for number verifications
 */
export class NumberVerifier extends GeneralVerifier<number | null | undefined> {
  constructor(entry: number | null | undefined, protected errorManager: NumberError) {
    super(entry);
  }

  /**
   * Makes sure that the number is as the expected one
   * @param expected The expected value
   * @throws {@link ShouldError} if the number is not as the expected.
   */
  equals = (expected: number): NumberVerifier =>
    this.manage(this.entry === expected, (d) => this.errorManager.equals(expected, this.entry, d));

  /**
   * Makes sure that the number is greater than the defined one
   * @param then The bottom border(exclusively)
   * @throws {@link ShouldError} if the number is less than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  greater = (then: number): NumberVerifier =>
    this.manage(!!this.entry && this.entry > then, (d) => this.errorManager.greater(then, this.entry, d), !this.entry);

  /**
   * Makes sure that the number is greater or as the defined one
   * @param then The bottom border(inclusively)
   * @throws {@link ShouldError} if the number is less than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  greaterOrEqual = (then: number): NumberVerifier =>
    this.manage(
      !!this.entry && this.entry >= then,
      (d) => this.errorManager.greaterOrEqual(then, this.entry, d),
      !this.entry,
    );

  /**
   * Makes sure that the number is less than the defined one
   * @param then The top border(exclusively)
   * @throws {@link ShouldError} if the number is greater than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  less = (then: number): NumberVerifier =>
    this.manage(!!this.entry && this.entry < then, (d) => this.errorManager.less(then, this.entry, d), !this.entry);

  /**
   * Makes sure that the number is less or as the defined one
   * @param then The top border(inclusively)
   * @throws {@link ShouldError} if the number is greater than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  lessOrEqual = (then: number): NumberVerifier =>
    this.manage(
      !!this.entry && this.entry <= then,
      (d) => this.errorManager.lessOrEqual(then, this.entry, d),
      !this.entry,
    );

  /**
   * Makes sure that the number is greater than zero
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  positive = (): NumberVerifier =>
    this.manage(!!this.entry && this.entry > 0, (d) => this.errorManager.positive(this.entry, d), this.entry == null);

  /**
   * Makes sure that the number is less than zero
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  negative = (): NumberVerifier =>
    this.manage(!!this.entry && this.entry < 0, (d) => this.errorManager.negative(this.entry, d), this.entry == null);

  /**
   * Makes sure that the number is the defined range
   * @param min The bottom border of the range(exclusively)
   * @param max The top border of the range(exclusively)
   * @throws {@link ShouldError} if the number is out of the range.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  inRange = (min: number, max: number): NumberVerifier =>
    this.manage(
      !!this.entry && this.entry > min && this.entry < max,
      (d) => this.errorManager.inRange(min, max, this.entry, d),
      !this.entry,
    );

  /**
   * Makes sure that the number is as the expected one, approximately
   * @param expected The expected value
   * @param precision The comparison precision
   * @throws {@link ShouldError} if the number is not as the expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  approximately = (expected: number, precision: number): NumberVerifier =>
    this.manage(
      !!this.entry && Math.abs(this.entry - expected) < precision,
      (d) => this.errorManager.approximately(expected, this.entry, d),
      !this.entry,
    );
}
