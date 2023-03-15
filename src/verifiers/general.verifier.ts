import { AbstractVerifier } from './abstract.verifier';
import { CommonError } from '../errors/common.error';

/**
 * An inspector responsible for comparison of objects
 */
export abstract class GeneralVerifier<T> extends AbstractVerifier {
  protected abstract errorManager: CommonError;

  protected constructor(protected entry: T) {
    super();
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
