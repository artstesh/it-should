import { ShouldError } from "../models/should.error";


export class StringVerifier {
  constructor(private entry: string | null | undefined) {
  }

  notEmpty(): StringVerifier {
    if (this.entry !== "") return this;
    throw new ShouldError(`${this.entry} is empty.`);
  }

  notNullOrEmpty(): StringVerifier {
    if (!!this.entry) return this;
    throw new ShouldError(`${this.entry} is empty or null.`);
  }

  beEmpty(): StringVerifier {
    if (this.entry === "") return this;
    throw new ShouldError(`${this.entry} is not empty.`);
  }

  beNullOrEmpty(): StringVerifier {
    if (!this.entry) return this;
    throw new ShouldError(`${this.entry} is not empty or null.`);
  }

  beWhiteSpace(): StringVerifier {
    if (this.entry?.replaceAll(' ', '')?.length === 0) return this;
    throw new ShouldError(`${this.entry} is not whitespace.`);
  }

  notWhiteSpace(): StringVerifier {
    if (!this.entry || this.entry.replaceAll(' ', '').length !== 0) return this;
    throw new ShouldError(`${this.entry} is whitespace.`);
  }

  beUpperCased(): StringVerifier {
    if (!this.entry || this.entry === this.entry?.toUpperCase()) return this;
    throw new ShouldError(`${this.entry} is not uppercased.`);
  }

  notBeUpperCased(): StringVerifier {
    if (!this.entry || this.entry === this.entry?.toLowerCase()) return this;
    throw new ShouldError(`${this.entry} is uppercased.`);
  }

  beLowerCased(): StringVerifier {
    if (!this.entry || this.entry === this.entry?.toLowerCase()) return this;
    throw new ShouldError(`${this.entry} is not uppercased.`);
  }

  notBeLowerCased(): StringVerifier {
    if (!this.entry || this.entry === this.entry?.toUpperCase()) return this;
    throw new ShouldError(`${this.entry} is uppercased.`);
  }

  hasLength(expected: number): StringVerifier {
    if (this.entry?.length === expected) return this;
    throw new ShouldError(`${this.entry} doesn't equal expected length ${expected}.`);
  }
}
