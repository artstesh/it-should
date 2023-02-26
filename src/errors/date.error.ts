import { CommonError } from "./common.error";

export class DateError extends CommonError {
  equals(expected?: Date | null, real?: Date | null, direct: boolean = true): string {
    return direct ? `${real} equals ${expected}, but should not.` : `${real} does not equal ${expected}.`;
  }

  before(then?: Date | null, real?: Date | null, direct: boolean = true): string {
    return direct
      ? `${real} is later then ${then}, but should not.`
      : `${real} is before then ${then}, but should not.`;
  }

  after(then?: Date | null, real?: Date | null, direct: boolean = true): string {
    return direct
      ? `${real} is before then ${then}, but should not.`
      : `${real} is later then ${then}, but should not.`;
  }
}
