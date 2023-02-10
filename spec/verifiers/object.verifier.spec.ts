import { Forger } from "@artstesh/forger";
import { ObjectVerifier } from "../../src/verifiers/object.verifier";
import { ShouldError } from "../../src/models/should.error";

describe('ObjectVerifier', () => {
  interface ITest {
    id: number;
    name: string;
    creation: Date;
    isActive: boolean;
    f1: () => void;
  }

  it('equal success', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    exp.name = entry.name;
    exp.isActive = entry.isActive;
    exp.creation = new Date(entry.creation);
    //
    expect(() => new ObjectVerifier(entry).equals(exp)).not.toThrow();
  })

  it('equal throws', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    exp.name = entry.name;
    exp.isActive = entry.isActive;
    exp.creation = new Date(entry.creation);
    //
    expect(() => new ObjectVerifier(entry).not.equals(exp)).toThrow(ShouldError);
  })

  it('ignoring success', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    exp.name = entry.name;
    exp.isActive = entry.isActive;
    //
    expect(() => new ObjectVerifier(entry).ignoring('creation').equals(exp)).not.toThrow();
  })

  it('ignoring throws', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    exp.name = entry.name;
    exp.isActive = entry.isActive;
    //
    expect(() => new ObjectVerifier(entry).ignoring('creation').not.equals(exp)).toThrow(ShouldError);
  })

  it('custom rule success', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    exp.name = entry.name;
    exp.isActive = entry.isActive;
    //
    expect(() => new ObjectVerifier(entry)
      .rule('creation',(o1,o2)=> o1 != o2)
      .equals(exp)).not.toThrow();
  })

  it('custom rule throws', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    exp.name = entry.name;
    exp.isActive = entry.isActive;
    //
    expect(() => new ObjectVerifier(entry)
      .rule('creation',(o1,o2)=> o1 != o2)
      .not.equals(exp)).toThrow(ShouldError);
  })

  it('compareOnly success', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    //
    expect(() => new ObjectVerifier(entry).compareOnly('id').equals(exp)).not.toThrow();
  })

  it('compareOnly throws', () => {
    const entry = Forger.create<ITest>()!;
    const exp = Forger.create<ITest>()!;
    exp.id = entry.id;
    //
    expect(() => new ObjectVerifier(entry).compareOnly('id').not.equals(exp)).toThrow(ShouldError);
  })
})
