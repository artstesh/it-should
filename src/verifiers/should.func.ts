import { VerifierFactory } from "./verifier.factory";

/**
 * The entry point for all the verifications
 * @returns {@link GeneralVerifier}
 */
export function should(): VerifierFactory {
  return VerifierFactory.getInstance();
}
