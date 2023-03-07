import { NumberVerifier } from './number.verifier';
import { StringVerifier } from './string.verifier';
import { ObjectsVerifier } from './objects.verifier';
import { ArrayVerifier } from './array.verifier';
import { DateVerifier } from './date.verifier';
import { ArrayError } from '../errors/array.error';
import { NumberError } from '../errors/number.error';
import { ObjectsError } from '../errors/objects.error';
import { StringError } from '../errors/string.error';
import { DateError } from '../errors/date.error';
import { ShouldError } from '../models/should.error';

/**
 * The factory that provides a concrete inspector
 */
export class VerifierFactory {
  private static instance = new VerifierFactory();

  private constructor() {}

  public static getInstance = () => VerifierFactory.instance;

  /**
   * Provides an inspector responsible for an array verifications
   * @param entry An array that should be examined
   * @returns {@link ArrayVerifier}
   */
  public array<T>(entry: (T | null | undefined)[] | null | undefined): ArrayVerifier<T> {
    return new ArrayVerifier(entry, new ArrayError());
  }

  /**
   * Provides an inspector responsible for number verifications
   * @param entry A number that should be examined
   * @returns {@link NumberVerifier}
   */
  public number(entry: number | null | undefined): NumberVerifier {
    return new NumberVerifier(entry, new NumberError());
  }

  /**
   * Provides an inspector responsible for comparison of objects
   * @param entry The first object that should be examined
   * @param other The second object that should be examined
   * @returns {@link ObjectsVerifier}
   */
  public objects<T, P>(entry: T, other: P): ObjectsVerifier<T, P> {
    return new ObjectsVerifier(entry, other, new ObjectsError());
  }

  /**
   * Provides an inspector responsible for a string verifications
   * @param entry A string that should be examined
   * @returns {@link StringVerifier}
   */
  public string(entry: string | null | undefined): StringVerifier {
    return new StringVerifier(entry, new StringError());
  }

  /**
   * Provides an inspector responsible for a Date verifications
   * @param entry A Date that should be examined
   * @returns {@link StringVerifier}
   */
  public date(entry: Date | string | null | undefined): DateVerifier {
    return new DateVerifier(entry, new DateError());
  }

  /**
   * Makes sure that the value is true in a boolean context.
   * Falsy values: false, 0, '', null, undefined, and NaN. Everything else is truthy.
   * @param entry A value that should be examined
   */
  public true(entry: any): void {
    let result = true;
    if (entry == null) result = false;
    else if (!entry && entry !== 0) result = false;
    if (!result) throw new ShouldError('The entry expected to be true.');
  }

  /**
   * Makes sure that the value is false in a boolean context.
   * Falsy values: false, 0, '', null, undefined, and NaN. Everything else is truthy.
   * @param entry A value that should be examined
   */
  public false(entry: any): void {
    let result = true;
    if (!!entry || entry === 0) result = false;
    if (!result) throw new ShouldError('The entry expected to be false.');
  }
}
