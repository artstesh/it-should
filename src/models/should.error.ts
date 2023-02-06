// tslint:disable-next-line:no-empty-interface
export interface ShouldError extends Error {

}

interface ShouldErrorConstructor extends ErrorConstructor {
  new(message?: string): ShouldError;
  (message?: string): ShouldError;
  readonly prototype: ShouldError;
}

export declare var ShouldError: ShouldErrorConstructor;
