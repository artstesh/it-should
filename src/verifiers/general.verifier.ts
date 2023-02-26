import { AbstractVerifier } from "./abstract.verifier";
import { CommonError } from "../errors/common.error";

/**
 * An inspector responsible for comparison of objects
 */
export abstract class GeneralVerifier<T> extends AbstractVerifier {
  protected abstract errorManager: CommonError;

  protected constructor(protected entry: T) {
    super();
  }

  /**
   * Checking that the element is of some type
   * @throws {@link ShouldError} if any of objects is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if the object has a different type.
   */
  public beTypeOf(
    type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function' | DateConstructor,
  ): this {
    this.checkDefined();
    if (type === Date) this.manage(this.entry instanceof Date, (d) => this.errorManager.beTypeOf('Date', d));
    else this.manage(typeof this.entry === type, (d) => this.errorManager.beTypeOf(type + '', d));
    return this;
  }

  /**
   * Makes sure that the examined string doesn't equal null or undefined
   * @throws {@link ShouldError} if the string is not defined.
   */
  defined = (): this => this.manage(this.entry != null, (d) => this.errorManager.defined(d));

  protected checkDefined(): boolean {
    this.manage(this.entry != null, (d) => this.errorManager.defined(d), true);
    return true;
  }
}
