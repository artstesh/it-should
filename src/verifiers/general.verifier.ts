import { NumberVerifier } from './number.verifier';
import { StringVerifier } from './string.verifier';
import { ObjectVerifier } from './object.verifier';

export class GeneralVerifier {
  private static instance = new GeneralVerifier();

  private constructor() {}

  public static getInstance = () => GeneralVerifier.instance;

  public number(entry: number | null | undefined): NumberVerifier {
    return new NumberVerifier(entry);
  }

  public string(entry: string | null | undefined): StringVerifier {
    return new StringVerifier(entry);
  }

  public object<T>(entry: T | null | undefined): ObjectVerifier<T> {
    return new ObjectVerifier<T>(entry);
  }
}
