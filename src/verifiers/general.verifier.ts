import { NumberVerifier } from './number.verifier';
import { StringVerifier } from './string.verifier';
import { ObjectsVerifier } from './objects.verifier';
import { ArrayVerifier } from './array.verifier';

/**
 * The factory that provides a concrete inspector
 */
export class GeneralVerifier {
  private static instance = new GeneralVerifier();

  private constructor() {}

  public static getInstance = () => GeneralVerifier.instance;

  /**
   * Provides an inspector responsible for number verifications
   * @param entry A number that should be examined
   * @returns {@link NumberVerifier}
   */
  public number(entry: number | null | undefined): NumberVerifier {
    return new NumberVerifier(entry);
  }

  /**
   * Provides an inspector responsible for a string verifications
   * @param entry A string that should be examined
   * @returns {@link StringVerifier}
   */
  public string(entry: string | null | undefined): StringVerifier {
    return new StringVerifier(entry);
  }

  /**
   * Provides an inspector responsible for comparison of objects
   * @param entry The first object that should be examined
   * @param other The second object that should be examined
   * @returns {@link ObjectsVerifier}
   */
  public objects<T, P>(entry: T | null | undefined, other: P | null | undefined): ObjectsVerifier<T, P> {
    return new ObjectsVerifier(entry, other);
  }

  /**
   * Provides an inspector responsible for an array verifications
   * @param entry An array that should be examined
   * @returns {@link ArrayVerifier}
   */
  public array<T>(entry: (T | null | undefined)[] | null | undefined): ArrayVerifier<T> {
    return new ArrayVerifier(entry);
  }
}
