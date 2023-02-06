import { ShouldError } from "../models/should.error";

export class NumberVerifier {
  constructor(private entry: number | null | undefined) {
  }

  beGreater(then: number | null | undefined): void {
    if (then == null || this.entry == null || this.entry <= then)
      throw new ShouldError(`${this.entry} is not greater then ${then}.`)
  }
}
