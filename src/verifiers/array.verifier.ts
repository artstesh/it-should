import { OrderingComparer } from './utils/ordering.comparer';
import { ArrayOrderedSettings } from '../models/array-ordered.settings';
import { GeneralVerifier } from './general.verifier';
import { ArrayError } from '../errors/array.error';

/**
 * An inspector responsible for an array verifications
 */
export class ArrayVerifier<T> extends GeneralVerifier<(T | null | undefined)[] | null | undefined> {
  constructor(entry: (T | null | undefined)[] | null | undefined, protected errorManager: ArrayError) {
    super(entry);
  }

  /**
   * Makes sure that the examined array has no items
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if the array is not empty
   */
  empty = (): ArrayVerifier<T> =>
    this.manage(this.checkDefined() && !this.entry?.length, (d) => this.errorManager.empty(d));

  /**
   * Makes sure that the examined array has the expected number of items
   * @param expected The expected length of the array
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if the array's length is not as the expected one.
   */
  length = (expected: number): ArrayVerifier<T> =>
    this.manage(this.checkDefined() && this.entry?.length === expected, (d) =>
      this.errorManager.length(expected, this.entry?.length, d),
    );

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
    this.manage(result, (d) => this.errorManager.ordered(d));
    return this;
  }

  /**
   * Makes sure that the examined array contains the expected element
   * @param expected The element that is expected
   * @param identifier A function that allows to identify an element as the expected one.
   * The function is actual for objects first of all, and shouldn't be defined in case of primitives.
   * @throws {@link ShouldError} if there are no expected elements in the array.
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   */
  contain(expected: T, identifier: (e?: T | null) => any = (x) => x): ArrayVerifier<T> {
    this.checkDefined();
    let result: number;
    if (!!identifier) result = this.entry?.filter((e) => identifier(e) === identifier(expected))?.length ?? 0;
    else result = this.entry?.filter((e) => e === expected)?.length ?? 0;
    this.manage(result > 0, (d) => this.errorManager.contain(d));
    return this;
  }

  /**
   * Makes sure that the examined array contains the expected element
   * @param times The number of times the element should be presented in the collection
   * @param expected The element that is expected
   * @param identifier A function that allows to identify an element as the expected one.
   * The function is actual for objects first of all, and shouldn't be defined in case of primitives.
   * @throws {@link ShouldError} if the number of the expected elements in the array is not correct.
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   */
  containExactly(times: number, expected: T, identifier: (e?: T | null) => any = (x) => x): ArrayVerifier<T> {
    this.checkDefined();
    let result: number;
    if (!!identifier) result = this.entry?.filter((e) => identifier(e) === identifier(expected))?.length ?? 0;
    else result = this.entry?.filter((e) => e === expected)?.length ?? 0;
    this.manage(result === times, (d) => this.errorManager.containExactly(times, result, d));
    return this;
  }

  /**
   * Makes sure that the examined array contains only elements that follow the condition
   * @param condition A function that describes the condition.
   * @throws {@link ShouldError} if the number of the expected elements in the array is not correct.
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   */
  containOnly(condition: (e?: T | null) => boolean): ArrayVerifier<T> {
    this.checkDefined();
    this.manage(!this.entry?.filter((e) => !condition(e))?.length, (d) => this.errorManager.containOnly(d));
    return this;
  }

  /**
   * Makes sure that the examined array contains at least one element that follows the condition
   * @param condition A function that describes the condition.
   * @throws {@link ShouldError} if there are no expected elements in the array.
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   */
  containBy(condition: (e?: T | null) => boolean): ArrayVerifier<T> {
    this.checkDefined();
    this.manage(!!this.entry?.filter((e) => condition(e))?.length, (d) => this.errorManager.containBy(d));
    return this;
  }

  /**
   * Makes sure that the examined array contains the expected number of elements that follow the condition
   * @param condition A function that describes the condition.
   * @param times The number of times the element should be presented in the collection
   * @throws {@link ShouldError} if the number of the expected elements in the array is not correct.
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   */
  containByExactly(times: number, condition: (e?: T | null) => boolean): ArrayVerifier<T> {
    this.checkDefined();
    const result = this.entry?.filter((e) => condition(e))?.length ?? 0;
    this.manage(result === times, (d) => this.errorManager.containByExactly(times, result, d));
    return this;
  }

  /**
   * Makes sure that the array contains only unique elements
   * @param identifier A function that allows to an element's identifier.
   * The function is actual for objects first of all, and shouldn't be defined in case of primitives.
   * @throws {@link ShouldError} if the array contains duplicates.
   * @throws {@link ShouldError} if the array is not defined regardless the presence/absence of not() function.
   */
  uniq(identifier: (e?: T | null) => any = (x) => x): ArrayVerifier<T> {
    this.checkDefined();
    const result = !!identifier ? this.entry?.map((e) => identifier(e)) : this.entry;
    this.manage(new Set(result).size === result?.length, (d) => this.errorManager.uniq(d));
    return this;
  }

  // OnlyHaveUniqueItems(x => x)
  // Equal
  // BeEquivalentTo([],x => x)
  // HaveSameCount([])
  // HaveCountGreaterThan
  // HaveCountLessThan
  // StartWith([],identifier: (e?: T | null) => any = x => x)
  // EndWith([],identifier: (e?: T | null) => any = x => x)
  // ?? HaveElementAt(2, 5)
}
