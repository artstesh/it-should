import { CommonError } from "./common.error";

export class NumberError extends CommonError {
  empty(direct = true): string {
    return direct ? 'The collection is not empty.' : 'The collection is empty.';
  }

  equals(expected?: number, real?: number | null, direct: boolean = true): string {
    return direct ? `${real} doesn't equal ${expected}.` : `${real} does equal ${expected}, but should not.`;
  }

  approximately(expected?: number, real?: number | null, direct: boolean = true): string {
    return direct
      ? `${real} doesn't approximately equal ${expected}.`
      : `${real} does approximately equal ${expected}, but should not.`;
  }

  greater(expected?: number, real?: number | null, direct: boolean = true): string {
    return direct ? `${real} is not greater then ${expected}.` : `${real} is greater then ${expected}, but should not.`;
  }

  greaterOrEqual(expected?: number, real?: number | null, direct: boolean = true): string {
    return direct
      ? `${real} is not greater or equal then ${expected}.`
      : `${real} is greater or equal then ${expected}, but should not.`;
  }

  less(expected?: number, real?: number | null, direct: boolean = true): string {
    return direct ? `${real} is not less then ${expected}.` : `${real} is less then ${expected}, but should not.`;
  }

  lessOrEqual(expected?: number, real?: number | null, direct: boolean = true): string {
    return direct
      ? `${real} is not less or equal then ${expected}.`
      : `${real} is less or equal then ${expected}, but should not.`;
  }

  inRange(min: number, max: number, real?: number | null, direct: boolean = true): string {
    return direct ? `${real} isn't in range [${min},${max}].` : `${real} is in range [${min},${max}], but should not.`;
  }

  positive(real?: number | null, direct: boolean = true): string {
    return direct ? `${real} is not positive.` : `${real} is positive, but should not.`;
  }

  negative(real?: number | null, direct: boolean = true): string {
    return direct ? `${real} is not negative.` : `${real} is negative, but should not.`;
  }
}
