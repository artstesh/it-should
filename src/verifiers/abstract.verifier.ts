import { ShouldError } from "../models/should.error";

export abstract class AbstractVerifier {
  protected notIsActivated = false;

  /**
   * Turns all the following exams to opposite state
   */
  public get not(): this {
    this.notIsActivated = true;
    return this;
  }

  protected manage(check: boolean, error: (direct: boolean) => string, ignoreNegative = false): this {
    if (this.notIsActivated && !ignoreNegative ? !check : check) return this;
    throw new ShouldError(error(!this.notIsActivated || ignoreNegative));
  }
}
