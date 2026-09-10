import { MethodError } from '../errors/method.error';
import { GeneralVerifier } from './general.verifier';

/**
 * An inspector responsible for function verifications
 */
export class MethodVerifier<R = any> extends GeneralVerifier<((...params: any[]) => R) | null | undefined> {
  constructor(entry: ((...params: any[]) => R) | null | undefined, protected errorManager: MethodError) {
    super(entry);
  }

  /**
   * Makes sure that the examined function throws an exception when invoked with the arguments
   * @param args Arguments the function should be invoked with
   * @throws {@link ShouldError} if the function is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if the function didn't throw.
   */
  throws = (...args: any[]): MethodVerifier<R> => {
    this.checkDefined();
    let thrown = false;
    try {
      this.entry!(...args);
    } catch (e) {
      thrown = true;
    }
    return this.manage(thrown, (d) => this.errorManager.throws(d));
  };

  /**
   * Invokes the examined function with the arguments and makes sure it returns a value instead of throwing.
   * The produced value is returned for further chains; under not() the invocation must throw and undefined is returned.
   * @param args Arguments the function should be invoked with
   * @throws {@link ShouldError} if the function is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if the function threw.
   */
  returns = (...args: any[]): R | undefined => {
    this.checkDefined();
    let result: R | undefined;
    let thrown = false;
    try {
      result = this.entry!(...args);
    } catch (e) {
      thrown = true;
    }
    this.manage(!thrown, (d) => this.errorManager.returns(d));
    return result;
  };
}
