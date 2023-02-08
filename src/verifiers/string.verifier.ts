import { AbstractVerifier } from "./abstract.verifier";
import { SingleParamFunc } from "./utils/verify.func";


export class StringVerifier extends AbstractVerifier {
  constructor(private entry: string | null | undefined) {
    super();
  }

  notEmpty = (): StringVerifier => this.manage(this.entry !== "", `${this.entry} is empty.`);

  notNullOrEmpty = (): StringVerifier => this.manage(!!this.entry, `${this.entry} is empty or null.`);

  beEmpty = (): StringVerifier => this.manage(this.entry === "", `${this.entry} is not empty.`);

  beNullOrEmpty = (): StringVerifier => this.manage(!this.entry, `${this.entry} is not empty or null.`);

  beWhiteSpace = (): StringVerifier =>
    this.manage(this.entry?.replaceAll(" ", "")?.length === 0, `${this.entry} is not whitespace.`);

  notWhiteSpace = (): StringVerifier =>
    this.manage(!this.entry || this.entry.replaceAll(" ", "").length !== 0,
      `${this.entry} is whitespace.`);

  beUpperCased = (): StringVerifier =>
    this.manage(!this.entry || this.entry === this.entry?.toUpperCase(), `${this.entry} is not uppercased.`);

  notBeUpperCased = (): StringVerifier =>
    this.manage(!this.entry || this.entry === this.entry?.toLowerCase(), `${this.entry} is uppercased.`);

  beLowerCased = (): StringVerifier =>
    this.manage(!this.entry || this.entry === this.entry?.toLowerCase(), `${this.entry} is not lowercased.`);

  notBeLowerCased = (): StringVerifier =>
    this.manage(!this.entry || this.entry === this.entry?.toUpperCase(), `${this.entry} is lowercased.`);

  hasLength = (expected: number): StringVerifier =>
    this.manage(this.entry?.length === expected, `${this.entry} doesn't equal expected length ${expected}.`);

  equals = (expected: string | null | undefined): StringVerifier => this.manage(this.entry === expected, `${this.entry} doesn't equal ${expected}.`);

  notEquals = (expected: string | null | undefined): StringVerifier =>
    this.manage(this.entry !== expected, `${this.entry} does equal ${expected}.`);

  equalsIgnoreCase = (expected: string | null | undefined): StringVerifier =>
    this.manage(this.entry?.toUpperCase() === expected?.toUpperCase(), `${this.entry} doesn't equal ${expected}.`);

  notEqualsIgnoreCase = (expected: string | null | undefined): StringVerifier =>
    this.manage(this.entry?.toUpperCase() !== expected?.toUpperCase(), `${this.entry} does equal ${expected}.`);

  contains(expected: string, counter?: SingleParamFunc<number>): void {
    const count = (this.entry?.split(expected)?.length ?? 0) - 1;
    const error = `'${this.entry}' doesn't contain '${expected}' expected number of times.`;
    this.manage(!!counter ? counter(count) : count > 0, error)
  }
}
