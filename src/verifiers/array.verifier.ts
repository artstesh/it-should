import { AbstractVerifier } from './abstract.verifier';
import { OrderingComparer } from './utils/ordering.comparer';
import { ArrayOrderedSettings } from '../models/array-ordered.settings';

/**
 * An inspector responsible for an array verifications
 */
export class ArrayVerifier<T> extends AbstractVerifier {
  constructor(private entry: (T | null | undefined)[] | null | undefined) {
    super();
  }

  /**
   * Makes sure that the examined array has no items
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if the array is not empty
   */
  empty = (): ArrayVerifier<T> => this.manage(this.checkDefined() && !this.entry?.length, `The collection is empty.`);

  /**
   * Makes sure that the examined array has the expected number of items
   * @param expected The expected length of the array
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if the array's length is not as the expected one.
   */
  hasLength = (expected: number): ArrayVerifier<T> =>
    this.manage(this.checkDefined() && this.entry?.length === expected, `The collection's length is not ${expected}.`);

  /**
   * Makes sure that the examined array is ordered properly
   * @param settings {@link ArrayOrderedSettings}
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if the array's order is not as the expected one.
   */
  ordered(settings?: ArrayOrderedSettings<T>): ArrayVerifier<T> {
    this.checkDefined();
    let result = true;
    settings = ArrayOrderedSettings.fix(settings);
    this.entry?.forEach((e, i) => {
      if (!result || i === this.entry!.length - 1) return;
      result = OrderingComparer.general(
        settings?.by!(this.entry![i]),
        settings?.by!(this.entry![i + 1]),
        settings?.dir,
      );
    });
    this.manage(result, `Elements aren't ordered.`);
    return this;
  }

  private checkDefined(): boolean {
    this.manage(!!this.entry, `Array is not defined`, true);
    return true;
  }
}
