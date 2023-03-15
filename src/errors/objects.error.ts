import { CommonError } from './common.error';

export class ObjectsError extends CommonError {
  countProperties(): string {
    return 'The objects has different number of properties.';
  }

  customRule(name: string): string {
    return `Objects failed custom rule for '${name}'.`;
  }

  differentValues(name: string, val1: any, val2: any): string {
    return `Objects have different '${name}': ${JSON.stringify(val1)} & ${JSON.stringify(val2)}.`;
  }

  equal(direct: boolean = true): string {
    return direct ? "Objects don't equal." : 'Objects do equal, but should not.';
  }
}
