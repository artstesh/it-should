import { CommonError } from "./common.error";

export class StringError extends CommonError {
  whitespace(real?: string | null, direct: boolean = true): string {
    return direct ? `'${real}' is not whitespace.` : `The '${real}' is whitespace, but should not.`;
  }

  upperCased(real?: string | null, direct: boolean = true): string {
    return direct ? `'${real}' is not uppercased.` : `The '${real}' is uppercased, but should not.`;
  }

  lowerCased(real?: string | null, direct: boolean = true): string {
    return direct ? `'${real}' is not lowercased.` : `The '${real}' is lowercased, but should not.`;
  }

  hasLength(expected?: number, real?: number, direct: boolean = true): string {
    return direct
      ? `The string's length was expected to be ${expected}, but got ${real}.`
      : `The string's length was not expected to be ${expected}.`;
  }

  equals(expected?: string | null, real?: string | null, direct: boolean = true): string {
    return direct ? `'${expected}' doesn't equal '${real}'.` : `'${expected}' does equal '${real}', but should not.`;
  }

  equalsIgnoreCase(expected?: string | null, real?: string | null, direct: boolean = true): string {
    return direct ? `'${expected}' doesn't equal '${real}'.` : `'${expected}' does equal '${real}', but should not.`;
  }

  contains(expected?: string | null, real?: string | null, direct: boolean = true): string {
    return direct
      ? `'${real}' doesn't contain '${expected}' expected number of times.`
      : `'${real}' does contain '${expected}' unexpected number of times.`;
  }

  containsIgnoreCase(expected?: string | null, real?: string | null, direct: boolean = true): string {
    return direct
      ? `'${real}' doesn't contain '${expected}' expected number of times.`
      : `'${real}' does contain '${expected}' unexpected number of times.`;
  }

  containsAny(real?: string | null, direct: boolean = true): string {
    return direct
      ? `'${real}' does not contain any of expected.`
      : `'${real}' does contain some of expected, but should not.`;
  }

  containsAnyIgnoreCase(real?: string | null, direct: boolean = true): string {
    return direct
      ? `'${real}' does not contain any of expected.`
      : `'${real}' does contain some of expected, but should not.`;
  }
}
