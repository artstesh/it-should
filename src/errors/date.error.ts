import { CommonError } from './common.error';

export class DateError extends CommonError {
  equals(expected?: Date | null, real?: Date | null, direct: boolean = true): string {
    return direct ? `${real} does not equal ${expected}.` : `${real} equals ${expected}, but should not.`;
  }

  before(then?: Date | null, real?: Date | null, direct: boolean = true): string {
    return direct ? `${real} is not before ${then}.` : `${real} is before ${then}, but should not.`;
  }

  after(then?: Date | null, real?: Date | null, direct: boolean = true): string {
    return direct ? `${real} is not after ${then}.` : `${real} is after ${then}, but should not.`;
  }

  inRange(min?: Date | null, max?: Date | null, real?: Date | null, direct: boolean = true): string {
    return direct
      ? `${real} isn't in range [${min}, ${max}].`
      : `${real} is in range [${min}, ${max}], but should not.`;
  }
}
