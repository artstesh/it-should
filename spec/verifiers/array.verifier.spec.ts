import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { ArrayVerifier } from "../../src/verifiers/array.verifier";

describe('ArrayVerifier', () => {

  describe('empty', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry).empty()).toThrow(ShouldError);
      })

      it('success', () => {
        let entry: string[] = [];
        //
        expect(() => new ArrayVerifier(entry).empty()).not.toThrow();
      })

      it('not empty throws', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).empty()).toThrow(ShouldError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry).not.empty()).toThrow(ShouldError);
      })

      it('not empty success', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).not.empty()).not.toThrow();
      })

      it('empty throws', () => {
        let entry: string[] = [];
        //
        expect(() => new ArrayVerifier(entry).not.empty()).toThrow(ShouldError);
      })
    })
  })

  describe('hasLength', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: string[];
        const expectedLength = Forger.create<number>()!;
        //
        expect(() => new ArrayVerifier(entry).hasLength(expectedLength)).toThrow(ShouldError);
      })

      it('success', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).hasLength(entry.length)).not.toThrow();
      })

      it('throws', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).hasLength(entry.length + 1)).toThrow(ShouldError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        const expectedLength = Forger.create<number>()!;
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry).not.hasLength(expectedLength)).toThrow(ShouldError);
      })

      it('success', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).not.hasLength(entry.length - 1)).not.toThrow();
      })

      it('throws', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).not.hasLength(entry.length)).toThrow(ShouldError);
      })
    })
  })

  describe('ordered', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry).ordered()).toThrow(ShouldError);
      })

      it('success asc', () => {
        let entry: string[] = Forger.create<string[]>()!.sort();
        //
        expect(() => new ArrayVerifier(entry).ordered()).not.toThrow();
      })

      it('success desc', () => {
        let entry: string[] = Forger.create<string[]>()!.sort((f, s) => f > s ? -1 : 1);
        //
        expect(() => new ArrayVerifier(entry).ordered({dir: 'desc'})).not.toThrow();
      })

      it('throws asc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
        //
        expect(() => new ArrayVerifier(entry).ordered()).toThrow(ShouldError);
      })

      it('throws desc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
        //
        expect(() => new ArrayVerifier(entry).ordered({dir: 'desc'})).toThrow(ShouldError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry).not.ordered()).toThrow(ShouldError);
      })

      it('success asc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
        //
        expect(() => new ArrayVerifier(entry).not.ordered()).not.toThrow();
      })

      it('success desc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
        //
        expect(() => new ArrayVerifier(entry).not.ordered({dir: 'desc'})).not.toThrow();
      })

      it('throws asc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!.sort();
        //
        expect(() => new ArrayVerifier(entry).not.ordered()).toThrow(ShouldError);
      })

      it('throws desc', () => {
        let entry: string[] = Forger.create<string[]>()!.sort((f, s) => f > s ? -1 : 1);
        //
        expect(() => new ArrayVerifier(entry).not.ordered({dir: 'desc'})).toThrow(ShouldError);
      })
    })
  })
})
