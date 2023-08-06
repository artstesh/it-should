import { MethodError } from "../errors/method.error";
import { GeneralVerifier } from "./general.verifier";

/**
 * An inspector responsible for functions
 */
export class MethodVerifier extends GeneralVerifier<null|undefined|((...params: any[]) => any)>{

  constructor(entry: null|undefined|((...params:any[])=> any), protected errorManager: MethodError) {
    super(entry);
    this.manage(this.entry != null, (d) => this.errorManager.defined(d), true);
  }

  /**
   * Makes sure that the method being investigated throws an exception
   * @throws {@link ShouldError} if the method didn't throw.
   * @throws {@link ShouldError} if the method is not defined regardless the presence/absence of not() function.
   */
  throws = (): MethodVerifier => {
    this.checkDefined();
    let thrown = true;
    try {
      this.entry!();
      thrown = false;
    } catch (e) {
      // ignore
    }
    finally {
      // ignore
    }
    return this.manage(thrown, (d) =>this.errorManager.throws(d));
  };
}
