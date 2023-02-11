import { GeneralVerifier } from './general.verifier';

/**
 * The entry point for all the verifications
 * @returns {@link GeneralVerifier}
 */
export function should(): GeneralVerifier {
  return GeneralVerifier.getInstance();
}
