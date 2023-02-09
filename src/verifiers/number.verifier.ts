import { AbstractVerifier } from "./abstract.verifier";

export class NumberVerifier extends AbstractVerifier {
  constructor(private entry: number | null | undefined) {
    super();
  }

  equals = (expected: number): NumberVerifier =>
    this.manage(this.entry === expected, `${this.entry} doesn't equal ${expected}.`);

  greater = (then: number): NumberVerifier =>
    this.manage( !!this.entry && this.entry > then,
      `${this.entry} is not greater then ${then}.`, !this.entry);

  greaterOrEqual = (then: number): NumberVerifier =>
    this.manage( !!this.entry && this.entry >= then,
      `${this.entry} is not greater or equal ${then}.`, !this.entry);

  less = (then: number): NumberVerifier =>
    this.manage( !!this.entry && this.entry < then,
      `${this.entry} is not greater or equal ${then}.`, !this.entry);

  lessOrEqual = (then: number): NumberVerifier =>
    this.manage( !!this.entry && this.entry <= then,
      `${this.entry} is not greater or equal ${then}.`, !this.entry);

  positive = (): NumberVerifier => this.manage(!!this.entry && this.entry > 0,
    `${this.entry} is not positive.`, this.entry == null);

  negative = (): NumberVerifier => this.manage(!!this.entry && this.entry < 0,
    `${this.entry} is not negative.`, this.entry == null);

  inRange = (min: number, max: number): NumberVerifier =>
    this.manage(!!this.entry && this.entry > min && this.entry < max, `${this.entry} isn't in range [${min},${max}].`,
      !this.entry)

  approximately = (expected: number, precision: number): NumberVerifier =>
    this.manage(!!this.entry && Math.abs(this.entry - expected) < precision, `${this.entry} doesn't equal ${expected}.`,
      !this.entry);
}
