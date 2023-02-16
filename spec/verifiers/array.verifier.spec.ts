import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { ArrayVerifier } from "../../src";

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

  describe('length', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: string[];
        const expectedLength = Forger.create<number>()!;
        //
        expect(() => new ArrayVerifier(entry).length(expectedLength)).toThrow(ShouldError);
      })

      it('success', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).length(entry.length)).not.toThrow();
      })

      it('throws', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).length(entry.length + 1)).toThrow(ShouldError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        const expectedLength = Forger.create<number>()!;
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry).not.length(expectedLength)).toThrow(ShouldError);
      })

      it('success', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).not.length(entry.length - 1)).not.toThrow();
      })

      it('throws', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).not.length(entry.length)).toThrow(ShouldError);
      })
    })
  })

  describe('contain', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).contain(Forger.create<number>()!)).toThrow(ShouldError);
      })

      it('primitive success', () => {
        let entry = Forger.create<string[]>()!;
        const expected = entry[1]!;
        //
        expect(() => new ArrayVerifier(entry).contain(expected)).not.toThrow();
      })

      it('object success', () => {
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>()!;
        const expected: ITest = {id: Forger.create<number>()!, name: entry[0].name};
        entry.push(expected);
        //
        expect(() => new ArrayVerifier(entry).contain(expected, e => e?.id)).not.toThrow();
      })

      it('throws if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expected: string = Forger.create<string>()!;
        //
        expect(() => new ArrayVerifier(entry).contain(expected)).toThrow(ShouldError);
      })

      it('success if contains a few', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expected = entry[0]!;
        entry.push(...[expected]);
        //
        expect(() => new ArrayVerifier(entry).contain(expected)).not.toThrow();
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).not.contain(Forger.create<number>()!)).toThrow(ShouldError);
      })

      it('primitive throws', () => {
        let entry = Forger.create<string[]>()!;
        const expected = entry[1]!;
        //
        expect(() => new ArrayVerifier(entry).not.contain(expected)).toThrow(ShouldError);
      })

      it('object throws', () => {
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>()!;
        const expected: ITest = {id: Forger.create<number>()!, name: entry[0].name};
        entry.push(expected);
        //
        expect(() => new ArrayVerifier(entry).not.contain(expected, e => e?.id)).toThrow(ShouldError);
      })

      it('success if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expected: string = Forger.create<string>()!;
        //
        expect(() => new ArrayVerifier(entry).not.contain(expected)).not.toThrow();
      })

      it('throws if contains a few', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expected = entry[0]!;
        entry.push(...[expected]);
        //
        expect(() => new ArrayVerifier(entry).not.contain(expected)).toThrow(ShouldError);
      })
    })
  })

  describe('containExactly', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry)
          .containExactly(Forger.create<number>()!, Forger.create<number>()!))
          .toThrow(ShouldError);
      })

      it('primitive success', () => {
        let entry = Forger.create<string[]>()!;
        const expected = entry[1]!;
        //
        expect(() => new ArrayVerifier(entry).containExactly(1, expected)).not.toThrow();
      })

      it('object success', () => {
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>()!;
        const expected: ITest = {id: Forger.create<number>()!, name: entry[0].name};
        entry.push(expected);
        //
        expect(() => new ArrayVerifier(entry).containExactly(1, expected, e => e?.id)).not.toThrow();
      })

      it('throws if not contain', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expected: string = Forger.create<string>()!;
        //
        expect(() => new ArrayVerifier(entry).containExactly(1, expected)).toThrow(ShouldError);
      })

      it('throws if contain wrong number', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expected = entry[0]!;
        //
        expect(() => new ArrayVerifier(entry).containExactly(2, expected)).toThrow(ShouldError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).not
          .containExactly(Forger.create<number>()!, Forger.create<number>()!)).toThrow(ShouldError);
      })

      it('primitive throws', () => {
        let entry = Forger.create<string[]>()!;
        const expected = entry[1]!;
        //
        expect(() => new ArrayVerifier(entry).not.containExactly(1, expected)).toThrow(ShouldError);
      })

      it('object throws', () => {
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>()!;
        const expected: ITest = {id: Forger.create<number>()!, name: entry[0].name};
        entry.push(expected);
        //
        expect(() => new ArrayVerifier(entry).not.containExactly(1, expected, e => e?.id)).toThrow(ShouldError);
      })

      it('success if not contain', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expected: string = Forger.create<string>()!;
        //
        expect(() => new ArrayVerifier(entry).not.containExactly(1, expected)).not.toThrow();
      })

      it('success if contain wrong number', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expected = entry[0]!;
        //
        expect(() => new ArrayVerifier(entry).not.containExactly(2, expected)).not.toThrow();
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

  describe('containBy', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).containBy(() => true)).toThrow(ShouldError);
      })

      it('primitive success', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry).containBy(e => e?.length === stringLength)).not.toThrow();
      })

      it('object success', () => {
        const idMax = 500;
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry).containBy(e => e!.id < idMax)).not.toThrow();
      })

      it('throws if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).containBy(e => e!.length > 1000)).toThrow(ShouldError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).not.containBy(() => true)).toThrow(ShouldError);
      })

      it('primitive throws', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry).not.containBy(e => e?.length === stringLength)).toThrow(ShouldError);
      })

      it('object throws', () => {
        const idMax = 500;
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry).not.containBy(e => e!.id < idMax)).toThrow(ShouldError);
      })

      it('success if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).not.containBy(e => e!.length > 1000)).not.toThrow();
      })
    })
  })

  describe('containOnly', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).containOnly(() => true)).toThrow(ShouldError);
      })

      it('primitive success', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry).containOnly(e => e?.length === stringLength)).not.toThrow();
      })

      it('object success', () => {
        const idMax = 500;
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry).containOnly(e => e!.id < idMax)).not.toThrow();
      })

      it('throws if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).containOnly(e => e!.length > 1000)).toThrow(ShouldError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).not.containOnly(() => true)).toThrow(ShouldError);
      })

      it('primitive throws', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry).not.containOnly(e => e?.length === stringLength)).toThrow(ShouldError);
      })

      it('object throws', () => {
        const idMax = 500;
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry).not.containOnly(e => e!.id < idMax)).toThrow(ShouldError);
      })

      it('success if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).not.containOnly(e => e!.length > 1000)).not.toThrow();
      })
    })
  })

  describe('containByExactly', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).containByExactly(3,() => true)).toThrow(ShouldError);
      })

      it('primitive success', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry).containByExactly(3,e => e?.length === stringLength)).not.toThrow();
      })

      it('object success', () => {
        const idMax = 500;
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry).containByExactly(3,e => e!.id < idMax)).not.toThrow();
      })

      it('throws if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).containByExactly(3,e => e!.length > 1000)).toThrow(ShouldError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry).not.containByExactly(3,() => true)).toThrow(ShouldError);
      })

      it('primitive throws', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry).not.containByExactly(3,e => e?.length === stringLength)).toThrow(ShouldError);
      })

      it('object throws', () => {
        const idMax = 500;
        interface ITest {id: number, name: string}
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry).not.containByExactly(3,e => e!.id < idMax)).toThrow(ShouldError);
      })

      it('success if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry).not.containByExactly(3,e => e!.length > 1000)).not.toThrow();
      })
    })
  })
})
