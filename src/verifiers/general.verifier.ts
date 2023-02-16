import { AbstractVerifier } from './abstract.verifier';

/**
 * An inspector responsible for comparison of objects
 */
export class GeneralVerifier<T> extends AbstractVerifier {
  constructor(protected entry: T) {
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
    if (type === Date) this.manage(this.entry instanceof Date, `${this.entry} is not of type ${type}`);
    else this.manage(typeof this.entry === type, `${this.entry} is not of type ${type}`);
    return this;
  }

  /**
   * Makes sure that the examined string doesn't equal null or undefined
   * @throws {@link ShouldError} if the string is not defined.
   */
  defined = (): this =>
    this.manage(this.entry != null, `'${this.entry}' is ${this.notIsActivated ? '' : 'not '}defined.`);

  protected checkDefined(): boolean {
    this.manage(this.entry != null, `The entry is ${this.notIsActivated ? '' : 'not '}defined`, true);
    return true;
  }
}
