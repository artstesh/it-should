import { GeneralVerifier } from "../../src/verifiers/general.verifier";
import { Forger } from "@artstesh/forger";
import { NumberVerifier } from "../../src/verifiers/number.verifier";
import { StringVerifier } from "../../src/verifiers/string.verifier";
import { ObjectVerifier } from "../../src/verifiers/object.verifier";

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

  it('creates object verifier', () => {
    interface Test {field: string}
    const result = GeneralVerifier.getInstance().object(Forger.create<Test>());
    //
    expect(typeof result == typeof ObjectVerifier)
  })
})
