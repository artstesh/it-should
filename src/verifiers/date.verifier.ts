import { GeneralVerifier } from './general.verifier';
import { DateError } from '../errors/date.error';

export type DateAccuracy = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

/**
 * An inspector responsible for Date verifications
 */
export class DateVerifier extends GeneralVerifier<Date | null | undefined> {
  constructor(entry: Date | string | null | undefined, protected errorManager: DateError) {
    super(DateVerifier.fixDate(entry));
  }

  /**
   * Makes sure that the Date is as the expected one
   * @param expected The expected value
   * @param accuracy Comparison accuracy
   * @throws {@link ShouldError} if the Date is not as the expected.
   * @throws {@link ShouldError} if the Date is not defined regardless the presence/absence of not() function.
   */
  equals = (expected: Date | string, accuracy?: DateAccuracy): DateVerifier => {
    this.checkDefined();
    const expectation = DateVerifier.fixDate(expected);
    if (!expectation) return this.manage(false, (d) => this.errorManager.equals(expectation, this.entry, d));
    const result =
      DateVerifier.roundDate(this.entry!, accuracy).getTime() ===
      DateVerifier.roundDate(expectation, accuracy).getTime();
    return this.manage(result, (d) => this.errorManager.equals(expectation, this.entry, d));
  };

  /**
   * Makes sure that the Date is before than the defined one
   * @param then The bottom border(exclusively)
   * @throws {@link ShouldError} if the number is less than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  before = (then: Date | string): DateVerifier => {
    this.checkDefined();
    const fixedThen = DateVerifier.fixDate(then);
    return this.manage(this.entry!.getTime() < (fixedThen?.getTime() ?? Number.MAX_VALUE), (d) =>
      this.errorManager.before(fixedThen, this.entry, d),
    );
  };

  /**
   * Makes sure that the Date is after than the defined one
   * @param then The top border(exclusively)
   * @throws {@link ShouldError} if the number is greater than expected.
   * @throws {@link ShouldError} if the number is not defined regardless the presence/absence of not() function.
   */
  after = (then: Date | string): DateVerifier => {
    this.checkDefined();
    const fixedThen = DateVerifier.fixDate(then);
    return this.manage(this.entry!.getTime() > (fixedThen?.getTime() ?? Number.MIN_VALUE), (d) =>
      this.errorManager.after(fixedThen, this.entry, d),
    );
  };

  /**
   * Makes sure that the Date is the defined range
   * @param min The bottom border of the range(exclusively)
   * @param max The top border of the range(exclusively)
   * @throws {@link ShouldError} if the Date is out of the range.
   * @throws {@link ShouldError} if the Date is not defined regardless the presence/absence of not() function.
   */
  inRange = (min: Date | string, max: Date | string): DateVerifier => {
    return this.before(max) || this.after(min);
  };

  private static fixDate(entry: Date | string | null | undefined): Date | null {
    if (entry == null) return null;
    if (entry instanceof Date) return entry;
    return new Date(entry);
  }

  private static roundDate(date: Date, accuracy?: DateAccuracy): Date {
    switch (accuracy) {
      case 'second':
        return new Date(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
          ).getTime(),
        );
      case 'minute':
        return new Date(
          new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()).getTime(),
        );
      case 'hour':
        return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()).getTime());
      case 'day':
        return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime());
      case 'month':
        return new Date(new Date(date.getFullYear(), date.getMonth()).getTime());
      case 'year':
        return new Date(new Date(date.getFullYear()).getTime());
      default:
        return new Date(date.getTime());
    }
  }
}
