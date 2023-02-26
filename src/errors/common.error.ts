export abstract class CommonError {
  defined(direct = true): string {
    return direct ? 'The entry is not defined.' : 'The entry is not defined, but should not.';
  }

  beTypeOf(expected?: string, direct: boolean = true): string {
    return direct ? `The entry is not of type ${expected}.` : `The entry is of type ${expected}, but should not.`;
  }
}
