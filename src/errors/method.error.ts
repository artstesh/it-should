import { CommonError } from './common.error';

export class MethodError extends CommonError {
  throws(direct = true): string {
    return direct ? "The method didn't throw." : 'The method did throw, but should not.';
  }

  returns(direct = true): string {
    return direct ? 'The method threw instead of returning.' : 'The method did return a value, but should not.';
  }
}
