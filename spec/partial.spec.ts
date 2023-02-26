import { Forger } from "@artstesh/forger";
import { StringVerifier, VerifierFactory } from "../src";

describe("isolated", () => {


  it('creates string verifier', () => {
    const result = VerifierFactory.getInstance().string(Forger.create<string>());
    //
    expect(typeof result == typeof StringVerifier)
  })
});
