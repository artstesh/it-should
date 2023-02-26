import { VerifierFactory } from "./verifier.factory";

/**
 * The entry point for all the verifications
 * @returns {@link VerifierFactory}
 */
export function should(): VerifierFactory {
  return VerifierFactory.getInstance();
}
