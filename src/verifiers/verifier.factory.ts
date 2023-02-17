import { NumberVerifier } from './number.verifier';
import { StringVerifier } from './string.verifier';
import { ObjectsVerifier } from './objects.verifier';
import { ArrayVerifier } from './array.verifier';
import { GeneralVerifier } from './general.verifier';

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
    return new ArrayVerifier(entry);
  }

  /**
   * Provides an inspector responsible for common verifications
   * @param entry An element that should be examined
   * @returns {@link GeneralVerifier}
   */
  public general<T>(entry: T): GeneralVerifier<T> {
    return new GeneralVerifier(entry);
  }

  /**
   * Provides an inspector responsible for number verifications
   * @param entry A number that should be examined
   * @returns {@link NumberVerifier}
   */
  public number(entry: number | null | undefined): NumberVerifier {
    return new NumberVerifier(entry);
  }

  /**
   * Provides an inspector responsible for comparison of objects
   * @param entry The first object that should be examined
   * @param other The second object that should be examined
   * @returns {@link ObjectsVerifier}
   */
  public objects<T, P>(entry: T, other: P): ObjectsVerifier<T, P> {
    return new ObjectsVerifier(entry, other);
  }

  /**
   * Provides an inspector responsible for a string verifications
   * @param entry A string that should be examined
   * @returns {@link StringVerifier}
   */
  public string(entry: string | null | undefined): StringVerifier {
    return new StringVerifier(entry);
  }
}
