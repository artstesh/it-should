import { ShouldError } from "../models/should.error";

export abstract class AbstractVerifier{


  protected manage(check: boolean, error: string): this {
    if (check) return this;
    throw new ShouldError(error);
  }
}
