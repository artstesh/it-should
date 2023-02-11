import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { ObjectsVerifier } from "../../src/verifiers/objects.verifier";

describe('ObjectsVerifier', () => {
  interface ITest {
    id: number;
    name: string;
    creation: Date;
    isActive: boolean;
    func: () => void;
  }

  describe('equal', () => {
    describe('direct', () => {
      it('original not defined throws', () => {
        let entry: ITest;
        const exp:ITest = Forger.create<ITest>()!;
        //
        expect(() => new ObjectsVerifier(entry,exp).equal()).toThrow(ShouldError);
      })

      it('other not defined throws', () => {
        const entry = Forger.create<ITest>()!;
        let exp: ITest;
        //
        expect(() => new ObjectsVerifier(entry,exp).equal()).toThrow(ShouldError);
      })

      it('equal success', () => {
        const entry = Forger.create<ITest>()!;
        const exp = Forger.create<ITest>()!;
        exp.id = entry.id;
        exp.name = entry.name;
        exp.isActive = entry.isActive;
        exp.creation = new Date(entry.creation);
        //
        expect(() => new ObjectsVerifier(entry,exp).equal()).not.toThrow();
      })

      it('ignoring success', () => {
        const entry = Forger.create<ITest>()!;
        const exp = Forger.create<ITest>()!;
        exp.id = entry.id;
        exp.name = entry.name;
        exp.isActive = entry.isActive;
        //
        expect(() => new ObjectsVerifier(entry,exp).ignoring('creation').equal()).not.toThrow();
      })

      it('custom rule success', () => {
        const entry = Forger.create<ITest>()!;
        const exp = Forger.create<ITest>()!;
        exp.id = entry.id;
        exp.name = entry.name;
        exp.isActive = entry.isActive;
        //
        expect(() => new ObjectsVerifier(entry,exp)
          .rule('creation',(o1,o2)=> o1 != o2)
          .equal()).not.toThrow();
      })

      it('compareOnly success', () => {
        const entry = Forger.create<ITest>()!;
        const exp = Forger.create<ITest>()!;
        exp.id = entry.id;
        //
        expect(() => new ObjectsVerifier(entry,exp).compareOnly('id').equal()).not.toThrow();
      })
    })
    describe('with not', () => {
      it('original not defined throws', () => {
        let entry: ITest;
        const exp:ITest = Forger.create<ITest>()!;
        //
        expect(() => new ObjectsVerifier(entry,exp).not.equal()).toThrow(ShouldError);
      })

      it('other not defined throws', () => {
        const entry = Forger.create<ITest>()!;
        let exp: ITest;
        //
        expect(() => new ObjectsVerifier(entry,exp).not.equal()).toThrow(ShouldError);
      })

      it('equal throws', () => {
        const entry = Forger.create<ITest>()!;
        const exp = Forger.create<ITest>()!;
        exp.id = entry.id;
        exp.name = entry.name;
        exp.isActive = entry.isActive;
        exp.creation = new Date(entry.creation);
        //
        expect(() => new ObjectsVerifier(entry,exp).not.equal()).toThrow(ShouldError);
      })

      it('ignoring throws', () => {
        const entry = Forger.create<ITest>()!;
        const exp = Forger.create<ITest>()!;
        exp.id = entry.id;
        exp.name = entry.name;
        exp.isActive = entry.isActive;
        //
        expect(() => new ObjectsVerifier(entry,exp).ignoring('creation').not.equal()).toThrow(ShouldError);
      })

      it('custom rule throws', () => {
        const entry = Forger.create<ITest>()!;
        const exp = Forger.create<ITest>()!;
        exp.id = entry.id;
        exp.name = entry.name;
        exp.isActive = entry.isActive;
        //
        expect(() => new ObjectsVerifier(entry,exp)
          .rule('creation',(o1,o2)=> o1 != o2)
          .not.equal()).toThrow(ShouldError);
      })

      it('compareOnly throws', () => {
        const entry = Forger.create<ITest>()!;
        const exp = Forger.create<ITest>()!;
        exp.id = entry.id;
        //
        expect(() => new ObjectsVerifier(entry,exp).compareOnly('id').not.equal()).toThrow(ShouldError);
      })
    })
  })
})
