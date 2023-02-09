import { ShouldError } from "../models/should.error";

export abstract class AbstractVerifier{
  protected negative = false;

  public get not(): this {
    this.negative = true;
    return this;
  }

  protected manage(check: boolean, error: string): this {
    if (this.negative ? !check : check) return this;
    throw new ShouldError(error);
  }
}
