import { GeneralVerifier } from './general.verifier';

export function should(): GeneralVerifier {
  return GeneralVerifier.getInstance();
}
