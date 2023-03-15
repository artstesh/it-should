import { CommonError } from './common.error';

export class ArrayError extends CommonError {
  empty(direct = true): string {
    return direct ? 'The collection is not empty.' : 'The collection is empty.';
  }

  equal(direct = true): string {
    return direct ? 'The collections are not equal.' : 'The collections are equal, but should not.';
  }

  ordered(direct = true): string {
    return direct ? "Elements aren't ordered." : 'Elements are ordered.';
  }

  contain(direct = true): string {
    return direct
      ? "The collection doesn't contain the expected element."
      : 'The collection does contain the expected element.';
  }

  containOnly(direct = true): string {
    return direct ? 'The collection contains other elements.' : 'The collection does not contain other elements.';
  }

  containBy(direct = true): string {
    return direct
      ? "The collection doesn't contain the expected element."
      : 'The collection does contain the expected element.';
  }

  length(expected?: number, real?: number, direct: boolean = true): string {
    return direct
      ? `The collection's length was expected to be ${expected}, but got ${real}.`
      : `The collection's length was not expected to be ${expected}.`;
  }

  containExactly(expected?: number, real?: number, direct: boolean = true): string {
    return direct
      ? `The collection's has ${real}, instead of ${expected} elements.`
      : `The collection's has ${real} elements, but should not.`;
  }

  containByExactly(expected?: number, real?: number, direct: boolean = true): string {
    return direct
      ? `The collection's has ${real}, instead of ${expected} elements.`
      : `The collection's has ${real} elements, but should not.`;
  }

  uniq(direct = true): string {
    return direct
      ? 'The collection contains duplicated elements.'
      : 'The collection does not contain duplicated elements.';
  }
}
