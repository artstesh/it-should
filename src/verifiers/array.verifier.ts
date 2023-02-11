import { AbstractVerifier } from "./abstract.verifier";
import { OrderingComparer } from "./utils/ordering.comparer";

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
   * @throws {@link ShouldError} if the array is empty
   */
  empty = (): ArrayVerifier<T> => this.manage(this.checkDefined() && !this.entry?.length, `The collection is empty.`);

  hasLength = (l: number): ArrayVerifier<T> =>
    this.manage(this.checkDefined() && this.entry?.length === l, `The collection's length is not ${l}.`);

  ordered(dir: 'asc' | 'desc' = 'asc', by: (e?: T | null) => any = (x) => x): ArrayVerifier<T> {
    this.checkDefined();
    let result = true;
    this.entry?.forEach((e, i) => {
      if (!result || i === this.entry!.length - 1) return;
      result = OrderingComparer.general(by(this.entry![i]), by(this.entry![i + 1]), dir);
    });
    this.manage(result, `Elements aren't ordered.`);
    return this;
  }

  private checkDefined(): boolean {
    this.manage(!!this.entry, `Array is not defined`, true);
    return true;
  }
}
