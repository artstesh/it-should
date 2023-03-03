import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { ArrayVerifier } from "../../src";
import { anyNumber, instance, mock, reset, when } from "ts-mockito";
import { ArrayError } from "../../src/errors/array.error";

interface ITest {id: number, name: string}

describe('ArrayVerifier', () => {
  const errorManager = mock(ArrayError);
  let expectedError: ShouldError;
  let errorMessage: string;

  beforeEach(() => {
    errorMessage = Forger.create<string>()!;
    expectedError = new ShouldError(errorMessage);
  })

  afterEach(() => {
    reset(errorManager);
  })

  describe('empty', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).empty()).toThrow(expectedError);
      })

      it('success', () => {
        let entry: string[] = [];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).empty()).not.toThrow();
      })

      it('not empty throws', () => {
        when(errorManager.empty(true)).thenReturn(errorMessage);
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).empty()).toThrow(expectedError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.empty()).toThrow(expectedError);
      })

      it('not empty success', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.empty()).not.toThrow();
      })

      it('empty throws', () => {
        when(errorManager.empty(false)).thenReturn(errorMessage);
        let entry: string[] = [];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.empty()).toThrow(expectedError);
      })
    })
  })

  describe('length', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: string[];
        const expectedLength = Forger.create<number>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).length(expectedLength)).toThrow(expectedError);
      })

      it('success', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).length(entry.length)).not.toThrow();
      })

      it('throws', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expectedLength = entry.length + 1;
        when(errorManager.length(expectedLength, entry.length, true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).length(expectedLength)).toThrow(expectedError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        const expectedLength = Forger.create<number>()!;
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.length(expectedLength)).toThrow(expectedError);
      })

      it('success', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.length(entry.length - 1)).not.toThrow();
      })

      it('throws', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expectedLength = entry.length;
        when(errorManager.length(expectedLength, entry.length, false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.length(expectedLength)).toThrow(expectedError);
      })
    })
  })

  describe('contain', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).contain(Forger.create<number>()!)).toThrow(expectedError);
      })

      it('primitive success', () => {
        let entry = Forger.create<string[]>()!;
        const expected = entry[1]!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).contain(expected)).not.toThrow();
      })

      it('object success', () => {
        let entry = Forger.create<ITest[]>()!;
        const expected: ITest = {id: Forger.create<number>()!, name: entry[0].name};
        entry.push(expected);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).contain(expected, e => e?.id)).not.toThrow();
      })

      it('throws if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expected: string = Forger.create<string>()!;
        when(errorManager.contain(true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).contain(expected)).toThrow(expectedError);
      })

      it('success if contains a few', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expected = entry[0]!;
        entry.push(...[expected]);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).contain(expected)).not.toThrow();
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.contain(Forger.create<number>()!)).toThrow(expectedError);
      })

      it('primitive throws', () => {
        let entry = Forger.create<string[]>()!;
        const expected = entry[1]!;
        when(errorManager.contain(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.contain(expected)).toThrow(expectedError);
      })

      it('object throws', () => {
        let entry = Forger.create<ITest[]>()!;
        const expected: ITest = {id: Forger.create<number>()!, name: entry[0].name};
        entry.push(expected);
        when(errorManager.contain(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.contain(expected, e => e?.id)).toThrow(expectedError);
      })

      it('success if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expected: string = Forger.create<string>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.contain(expected)).not.toThrow();
      })

      it('throws if contains a few', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expected = entry[0]!;
        entry.push(...[expected]);
        when(errorManager.contain(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.contain(expected)).toThrow(expectedError);
      })
    })
  })

  describe('containExactly', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager))
          .containExactly(Forger.create<number>()!, Forger.create<number>()!))
          .toThrow(expectedError);
      })

      it('primitive success', () => {
        let entry = Forger.create<string[]>()!;
        const expected = entry[1]!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containExactly(1, expected)).not.toThrow();
      })

      it('object success', () => {
        let entry = Forger.create<ITest[]>()!;
        const expected: ITest = {id: Forger.create<number>()!, name: entry[0].name};
        entry.push(expected);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containExactly(1, expected, e => e?.id)).not.toThrow();
      })

      it('throws if not contain', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expected: string = Forger.create<string>()!;
        const expectedTimes = 1;
        when(errorManager.containExactly(expectedTimes, anyNumber(), true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containExactly(expectedTimes, expected)).toThrow(expectedError);
      })

      it('throws if contain wrong number', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expected = entry[0]!;
        const expectedTimes = 2;
        when(errorManager.containExactly(expectedTimes, anyNumber(), true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containExactly(expectedTimes, expected)).toThrow(expectedError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not
          .containExactly(Forger.create<number>()!, Forger.create<number>()!)).toThrow(expectedError);
      })

      it('primitive throws', () => {
        let entry = Forger.create<string[]>()!;
        const expected = entry[1]!;
        const expectedTimes = 1;
        when(errorManager.containExactly(expectedTimes, anyNumber(), false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containExactly(expectedTimes, expected)).toThrow(expectedError);
      })

      it('object throws', () => {
        let entry = Forger.create<ITest[]>()!;
        const expected: ITest = {id: Forger.create<number>()!, name: entry[0].name};
        entry.push(expected);
        const expectedTimes = 1;
        when(errorManager.containExactly(expectedTimes, anyNumber(), false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containExactly(expectedTimes, expected, e => e?.id)).toThrow(expectedError);
      })

      it('success if not contain', () => {
        let entry: string[] = Forger.create<string[]>()!;
        let expected: string = Forger.create<string>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containExactly(1, expected)).not.toThrow();
      })

      it('success if contain wrong number', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expected = entry[0]!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containExactly(2, expected)).not.toThrow();
      })
    })
  })

  describe('ordered', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).ordered()).toThrow(expectedError);
      })

      it('success asc', () => {
        let entry: string[] = Forger.create<string[]>()!.sort();
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).ordered()).not.toThrow();
      })

      it('success desc', () => {
        let entry: string[] = Forger.create<string[]>()!.sort((f, s) => f > s ? -1 : 1);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).ordered({dir: 'desc'})).not.toThrow();
      })

      it('throws asc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
        when(errorManager.ordered(true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).ordered()).toThrow(expectedError);
      })

      it('throws desc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
        when(errorManager.ordered(true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).ordered({dir: 'desc'})).toThrow(expectedError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: string[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.ordered()).toThrow(expectedError);
      })

      it('success asc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.ordered()).not.toThrow();
      })

      it('success desc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.ordered({dir: 'desc'})).not.toThrow();
      })

      it('throws asc', () => {
        let entry: string[] = Forger.create<string[]>({arrayLength: 10})!.sort();
        when(errorManager.ordered(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.ordered()).toThrow(expectedError);
      })

      it('throws desc', () => {
        let entry: string[] = Forger.create<string[]>()!.sort((f, s) => f > s ? -1 : 1);
        when(errorManager.ordered(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.ordered({dir: 'desc'})).toThrow(expectedError);
      })
    })
  })

  describe('containBy', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containBy(() => true)).toThrow(expectedError);
      })

      it('primitive success', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containBy(e => e?.length === stringLength)).not.toThrow();
      })

      it('object success', () => {
        const idMax = 500;
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containBy(e => e!.id < idMax)).not.toThrow();
      })

      it('throws if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        when(errorManager.containBy(true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containBy(e => e!.length > 1000)).toThrow(expectedError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containBy(() => true)).toThrow(expectedError);
      })

      it('primitive throws', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        when(errorManager.containBy(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containBy(e => e?.length === stringLength)).toThrow(expectedError);
      })

      it('object throws', () => {
        const idMax = 500;
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        when(errorManager.containBy(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containBy(e => e!.id < idMax)).toThrow(expectedError);
      })

      it('success if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containBy(e => e!.length > 1000)).not.toThrow();
      })
    })
  })

  describe('containOnly', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containOnly(() => true)).toThrow(expectedError);
      })

      it('primitive success', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containOnly(e => e?.length === stringLength)).not.toThrow();
      })

      it('object success', () => {
        const idMax = 500;
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containOnly(e => e!.id < idMax)).not.toThrow();
      })

      it('throws if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        when(errorManager.containOnly(true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containOnly(e => e!.length > 1000)).toThrow(expectedError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containOnly(() => true)).toThrow(expectedError);
      })

      it('primitive throws', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        when(errorManager.containOnly(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containOnly(e => e?.length === stringLength)).toThrow(expectedError);
      })

      it('object throws', () => {
        const idMax = 500;
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        when(errorManager.containOnly(false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containOnly(e => e!.id < idMax)).toThrow(expectedError);
      })

      it('success if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containOnly(e => e!.length > 1000)).not.toThrow();
      })
    })
  })

  describe('containByExactly', () => {
    describe('direct', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containByExactly(3,() => true)).toThrow(expectedError);
      })

      it('primitive success', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containByExactly(3,e => e?.length === stringLength)).not.toThrow();
      })

      it('object success', () => {
        const idMax = 500;
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containByExactly(3,e => e!.id <= idMax)).not.toThrow();
      })

      it('throws if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        const expectedTimes = 3;
        when(errorManager.containByExactly(expectedTimes, anyNumber(), true)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).containByExactly(expectedTimes,e => e!.length > 1000)).toThrow(expectedError);
      })
    })
    describe('with not', () => {
      it('entry not defined throws', () => {
        when(errorManager.defined(true)).thenReturn(errorMessage);
        let entry: number[];
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containByExactly(3,() => true)).toThrow(expectedError);
      })

      it('primitive throws', () => {
        const stringLength = 5;
        let entry = Forger.create<string[]>({stringLength})!;
        const expectedTimes = 3;
        when(errorManager.containByExactly(expectedTimes, entry.length, false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containByExactly(expectedTimes,e => e?.length === stringLength)).toThrow(expectedError);
      })

      it('object throws', () => {
        const idMax = 500;
        let entry = Forger.create<ITest[]>({numberMax: idMax})!;
        const expectedTimes = 3;
        when(errorManager.containByExactly(expectedTimes, entry.length, false)).thenReturn(errorMessage);
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containByExactly(expectedTimes,e => e!.id < idMax)).toThrow(expectedError);
      })

      it('success if not contains', () => {
        let entry: string[] = Forger.create<string[]>()!;
        //
        expect(() => new ArrayVerifier(entry, instance(errorManager)).not.containByExactly(3,e => e!.length > 1000)).not.toThrow();
      })
    })
  })
})
