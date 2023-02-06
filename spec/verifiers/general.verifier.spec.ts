import { GeneralVerifier } from "../../src/verifiers/general.verifier";
import { Forger } from "@artstesh/forger";
import { NumberVerifier } from "../../src/verifiers/number.verifier";
import { StringVerifier } from "../../src/verifiers/string.verifier";

describe('GeneralVerifier', () => {

  it('creates number verifier', () => {
    const result = GeneralVerifier.getInstance().number(Forger.create<number>());
    //
    expect(typeof result == typeof NumberVerifier)
  })

  it('creates string verifier', () => {
    const result = GeneralVerifier.getInstance().string(Forger.create<string>());
    //
    expect(typeof result == typeof StringVerifier)
  })
})
