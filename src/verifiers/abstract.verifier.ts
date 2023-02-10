import { ShouldError } from "../models/should.error";

export abstract class AbstractVerifier{
  protected notIsActivated = false;

  public get not(): this {
    this.notIsActivated = true;
    return this;
  }

  protected manage(check: boolean, error: string, ignoreNegative = false): this {
    if ((this.notIsActivated && !ignoreNegative) ? !check : check) return this;
    console.log(error);
    throw new ShouldError(error);
  }
}
