import { Forger } from "@artstesh/forger";
import { ObjectVerifier } from "../../src/verifiers/object.verifier";

describe('ObjectVerifier', () => {
  interface ITest {
    id: number;
    name: string;
    creation: Date;
    isActive: boolean;
  }

  it('equal success', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    exp.name = entry.name;
    exp.isActive = entry.isActive;
    //
    expect(() => new ObjectVerifier(entry).equals(exp)).not.toThrow();
  })
})
