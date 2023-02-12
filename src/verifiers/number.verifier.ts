import { AbstractVerifier } from './abstract.verifier';

/**
 * An inspector responsible for number verifications
 */
export class NumberVerifier extends AbstractVerifier {
  constructor(private entry: number | null | undefined) {
    super();
  }

  /**
   * Makes sure that the number is as the expected one
   * @param expected The expected value
   * @throws {@link ShouldError} if the number is not as the expected.
   */
  equals = (expected: number): NumberVerifier =>
    this.manage(this.entry === expected, `${this.entry} doesn't equal ${expected}.`);

  /**
   * Makes sure that the number is greater than the defined one
   * @param then The bottom border(exclusively)
   * @throws {@link ShouldError} if the number is less than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  greater = (then: number): NumberVerifier =>
    this.manage(!!this.entry && this.entry > then, `${this.entry} is not greater then ${then}.`, !this.entry);

  /**
   * Makes sure that the number is greater or as the defined one
   * @param then The bottom border(inclusively)
   * @throws {@link ShouldError} if the number is less than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  greaterOrEqual = (then: number): NumberVerifier =>
    this.manage(!!this.entry && this.entry >= then, `${this.entry} is not greater or equal ${then}.`, !this.entry);

  /**
   * Makes sure that the number is less than the defined one
   * @param then The top border(exclusively)
   * @throws {@link ShouldError} if the number is greater than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  less = (then: number): NumberVerifier =>
    this.manage(!!this.entry && this.entry < then, `${this.entry} is not greater or equal ${then}.`, !this.entry);

  /**
   * Makes sure that the number is less or as the defined one
   * @param then The top border(inclusively)
   * @throws {@link ShouldError} if the number is greater than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  lessOrEqual = (then: number): NumberVerifier =>
    this.manage(!!this.entry && this.entry <= then, `${this.entry} is not greater or equal ${then}.`, !this.entry);

  /**
   * Makes sure that the number is greater than zero
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  positive = (): NumberVerifier =>
    this.manage(!!this.entry && this.entry > 0, `${this.entry} is not positive.`, this.entry == null);

  /**
   * Makes sure that the number is less than zero
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  negative = (): NumberVerifier =>
    this.manage(!!this.entry && this.entry < 0, `${this.entry} is not negative.`, this.entry == null);

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
      `${this.entry} isn't in range [${min},${max}].`,
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
      `${this.entry} doesn't equal ${expected}.`,
      !this.entry,
    );
}
