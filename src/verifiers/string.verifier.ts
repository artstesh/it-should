import { AbstractVerifier } from "./abstract.verifier";
import { SingleParamFunc } from "./utils/verify.func";


export class StringVerifier extends AbstractVerifier {
  constructor(private entry: string | null | undefined) {
    super();
  }

  empty = (): StringVerifier => this.manage(this.entry === "", `'${this.entry} 'is not empty.`);

  nullOrEmpty = (): StringVerifier => this.manage(!this.entry, `'${this.entry} 'is not empty or null.`);

  whitespace = (): StringVerifier =>
    this.manage(this.entry?.replaceAll(" ", "")?.length === 0, `'${this.entry} 'is not whitespace.`);

  upperCased = (): StringVerifier =>
    this.manage(!!this.entry
      && this.entry === this.entry.toUpperCase(), `'${this.entry}' is not uppercased.`,
      !this.entry?.replaceAll(" ", ""));

  lowerCased = (): StringVerifier =>
    this.manage(!!this.entry
      && this.entry === this.entry.toLowerCase(), `'${this.entry} 'is not lowercased.`,
      !this.entry?.replaceAll(" ", ""));

  hasLength = (expected: number): StringVerifier =>
    this.manage(this.entry?.length === expected, `'${this.entry}' doesn't equal expected length ${expected}.`);

  equals = (expected: string | null | undefined): StringVerifier => this.manage(this.entry === expected, `'${this.entry}' doesn't equal ${expected}.`);

  equalsIgnoreCase = (expected: string | null | undefined): StringVerifier =>
    this.manage(this.entry?.toUpperCase() === expected?.toUpperCase(), `'${this.entry}' doesn't equal ${expected}.`);

  contains(expected: string, counter?: SingleParamFunc<number>): void {
    const count = (this.entry?.split(expected)?.length ?? 0) - 1;
    const error = `'${this.entry}' doesn't contain '${expected}' expected number of times.`;
    this.manage(!!counter ? counter(count) : count > 0, error)
  }

  containsIgnoreCase(expected: string, counter?: SingleParamFunc<number>): void {
    const count = (this.entry?.toUpperCase()?.split(expected?.toUpperCase())?.length ?? 0) - 1;
    const error = `'${this.entry}' doesn't contain '${expected}' expected number of times.`;
    this.manage(!!counter ? counter(count) : count > 0, error)
  }

  containsAny(expected: string[]): void {
    let found = 0;
    if (!!this.entry)
      found = expected.map(e => this.entry?.indexOf(e) !== -1).filter(e => e)?.length ?? 0;
    this.manage(found > 0, `'${this.entry}' doesn't contain any of [${expected.join(',')}].`);
  }

  containsAnyIgnoreCase(expected: string[]): void {
    let found = 0;
    if (!!this.entry)
      found = expected.map(e => this.entry?.toUpperCase().indexOf(e.toUpperCase()) !== -1).filter(e => e)?.length ?? 0;
    this.manage(found > 0, `'${this.entry}' doesn't contain any of [${expected.join(',')}].`);
  }
}
