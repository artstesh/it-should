export class ShouldError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, ShouldError.prototype);
  }
}
