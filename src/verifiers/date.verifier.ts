import { GeneralVerifier } from './general.verifier';

/**
 * An inspector responsible for number verifications
 */
export class DateVerifier extends GeneralVerifier<Date | null | undefined> {
  constructor(entry: Date | string | null | undefined) {
    super(DateVerifier.fixDate(entry));
  }

  /**
   * Makes sure that the Date is as the expected one
   * @param expected The expected value
   * @param deviation Permissible deviation when comparing dates
   * @throws {@link ShouldError} if the number is not as the expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  equals = (expected: Date | string, deviation?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'): DateVerifier => {
    this.checkDefined();
    const expectation = DateVerifier.fixDate(expected);
    let result: boolean;
    if (!expectation)  return this.manage(false, `${this.entry} doesn't equal ${expected}.`);
    switch (deviation){
      case 'second': result = new Date(this.entry!.getFullYear(), this.entry!.getMonth(), expectation.getDate(), expectation.getHours(), expectation.getMinutes(), expectation.getSeconds()).getTime()
        === new Date(expectation.getFullYear(), expectation.getMonth(), expectation.getDate(), expectation.getHours(), expectation.getMinutes(), expectation.getSeconds()).getTime();
      break;
      case 'minute': result = new Date(this.entry!.getFullYear(), this.entry!.getMonth(), expectation.getDate(), expectation.getHours(), expectation.getMinutes()).getTime()
        === new Date(expectation.getFullYear(), expectation.getMonth(), expectation.getDate(), expectation.getHours(), expectation.getMinutes()).getTime();
      break;
      case 'hour': result = new Date(this.entry!.getFullYear(), this.entry!.getMonth(), expectation.getDate(), expectation.getHours()).getTime()
        === new Date(expectation.getFullYear(), expectation.getMonth(), expectation.getDate(), expectation.getHours()).getTime();
      break;
      case 'day': result = new Date(this.entry!.getFullYear(), this.entry!.getMonth(), expectation.getDate()).getTime() === new Date(expectation.getFullYear(), expectation.getMonth(), expectation.getDate()).getTime();
      break;
      case 'month': result = new Date(this.entry!.getFullYear(), this.entry!.getMonth()).getTime() === new Date(expectation.getFullYear(), expectation.getMonth()).getTime();
      break;
      case 'year': result = new Date(this.entry!.getFullYear()).getTime() === new Date(expectation.getFullYear()).getTime();
      break;
      default: result = this.entry?.getTime() === expectation.getTime();
    }
    return this.manage(result, `${this.entry} doesn't equal ${expected}.`);
  }

  /**
   * Makes sure that the number is greater than the defined one
   * @param then The bottom border(exclusively)
   * @throws {@link ShouldError} if the number is less than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  later = (then: Date | string): DateVerifier =>
    this.manage(!!this.entry && this.entry > then, `${this.entry} is not greater then ${then}.`, !this.entry);

  /**
   * Makes sure that the number is less than the defined one
   * @param then The top border(exclusively)
   * @throws {@link ShouldError} if the number is greater than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  earlier = (then: Date | string): DateVerifier =>
    this.manage(!!this.entry && this.entry < then, `${this.entry} is not greater or equal ${then}.`, !this.entry);

  /**
   * Makes sure that the number is the defined range
   * @param min The bottom border of the range(exclusively)
   * @param max The top border of the range(exclusively)
   * @throws {@link ShouldError} if the number is out of the range.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  inRange = (min: Date | string, max: Date | string): DateVerifier =>
    this.manage(
      !!this.entry && this.entry > min && this.entry < max,
      `${this.entry} isn't in range [${min},${max}].`,
      !this.entry,
    );

  private static fixDate(entry: Date | string | null | undefined) : Date | null {
    if (entry == null) return null;
    if (entry instanceof Date) return entry;
    return new Date(entry);
  }
}
