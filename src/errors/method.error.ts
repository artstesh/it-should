import { CommonError } from './common.error';

export class MethodError extends CommonError {
  throws(direct = true): string {
    return direct ? "The method didn't throw." : 'The method did throw, but should not.';
  }
}
