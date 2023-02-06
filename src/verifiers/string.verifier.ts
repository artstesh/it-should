import { ShouldError } from "../models/should.error";


export class StringVerifier {
  constructor(private entry: string | null | undefined) {
  }

  notEmpty(): void {
    if (this.entry !== "") return;
    throw new ShouldError(`${this.entry} is empty.`);
  }

  notNullOrEmpty(): void {
    if (!this.entry)
      throw new ShouldError(`${this.entry} is empty or null.`);
  }

  beEmpty(): void {
    if (this.entry === '') return;
    throw new ShouldError(`${this.entry} is not empty.`);
  }

  beNullOrEmpty(): void {
    if (!this.entry) return;
    throw new ShouldError(`${this.entry} is not empty or null.`);
  }
}
