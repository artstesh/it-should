import { OrderingComparer } from "./utils/ordering.comparer";
import { ArrayOrderedSettings } from "../models/array-ordered.settings";
import { GeneralVerifier } from "./general.verifier";

/**
 * An inspector responsible for an array verifications
 */
export class ArrayVerifier<T> extends GeneralVerifier<(T | null | undefined)[] | null | undefined> {
  constructor(entry: (T | null | undefined)[] | null | undefined) {
    super(entry);
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
  length = (expected: number): ArrayVerifier<T> =>
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

  /**
   * Makes sure that the examined array contains the expected element
   * @param expected The element that is expected
   * @param identifier A function that allows to identify an element as the expected one.
   * The function is actual for objects first of all, and shouldn't be defined in case of primitives.
   */
  contain(expected: T, identifier: (e?: T | null) => any = (x) => x): ArrayVerifier<T> {
    this.checkDefined();
    let result: number;
    if (!!identifier) result = this.entry?.filter((e) => identifier(e) === identifier(expected))?.length ?? 0;
    else result = this.entry?.filter((e) => e === expected)?.length ?? 0;
    this.manage(result > 0, `The collection doesn't contain the expected element.`);
    return this;
  }

  /**
   * Makes sure that the examined array contains the expected element
   * @param times The number of times the element should be presented in the collection
   * @param expected The element that is expected
   * @param identifier A function that allows to identify an element as the expected one.
   * The function is actual for objects first of all, and shouldn't be defined in case of primitives.
   */
  containExactly(times: number, expected: T, identifier: (e?: T | null) => any = (x) => x): ArrayVerifier<T> {
    this.checkDefined();
    let result: number;
    if (!!identifier) result = this.entry?.filter((e) => identifier(e) === identifier(expected))?.length ?? 0;
    else result = this.entry?.filter((e) => e === expected)?.length ?? 0;
    this.manage(result === times, `The collection has ${result} elements instead of one.`);
    return this;
  }

  // ContainInOrder
  // Equal
  // BeEquivalentTo([],x => x)
  // OnlyHaveUniqueItems(x => x)
  // HaveSameCount([])
  // HaveCountGreaterThan
  // HaveCountLessThan
  // StartWith([],identifier: (e?: T | null) => any = x => x)
  // EndWith([],identifier: (e?: T | null) => any = x => x)
  // haveByCondition(x => x > 3, expected: number)
  // OnlyContain(x => x > 3)
  // array.onlyContain(condition: (e?: T | null) => boolean);
  // array.ContainBy(condition: (e?: T | null) => boolean);
  // array.ContainByExactly(times: number, condition: (e?: T | null) => boolean);
  // ?? HaveElementAt(2, 5)
}
