import { Forger } from "@artstesh/forger";
import { NumberVerifier } from "../../src";
import { ShouldError } from "../../src/models/should.error";
import { instance, mock, reset, when } from "ts-mockito";
import { NumberError } from "../../src/errors/number.error";

describe('NumberVerifier', () => {
  const errorManager = mock(NumberError);
  let expectedError: ShouldError;
  let errorMessage: string;

  beforeEach(() => {
    errorMessage = Forger.create<string>()!;
    expectedError = new ShouldError(errorMessage);
  })

  afterEach(() => {
    reset(errorManager);
  })

  describe('equals', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).equals(entry)).not.toThrow();
    })

    it('not equal throws', () => {
      const entry = Forger.create<number>()!;
      const expected = Forger.create<number>()!;
      when(errorManager.equals(expected,entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).equals(expected)).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).equals(expected)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).equals(expected)).toThrow(expectedError);
    })
  })

  describe('not equals', () => {
    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.equals(entry,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.equals(entry)).toThrow(expectedError);
    })

    it('not equal success', () => {
      const entry = Forger.create<number>()!;
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.equals(expected)).not.toThrow();
    })

    it('undefined success', () => {
      const expected = Forger.create<number>()!;
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.equals(expected)).toThrow(expectedError);
    })

    it('null success', () => {
      const expected = Forger.create<number>()!;
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.equals(expected)).toThrow(expectedError);
    })
  })

  describe('greater', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greater(then)).not.toThrow();
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.greater(entry,entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greater(entry)).toThrow(expectedError);
    })

    it('not greater throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      when(errorManager.greater(then,entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greater(then)).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).greater(then)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).greater(then)).toThrow(expectedError);
    })
  })

  describe('not greater', () => {
    it('greater throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      when(errorManager.greater(then,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greater(then)).toThrow(expectedError);
    })

    it('equal success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greater(entry)).not.toThrow();
    })

    it('not greater success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greater(then)).not.toThrow();
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.greater(then)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.greater(then)).toThrow(expectedError);
    })
  })

  describe('less', () => {
    it('not less throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      when(errorManager.less(then,entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).less(then)).toThrow(expectedError);
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.less(entry,entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).less(entry)).toThrow(expectedError);
    })

    it('less success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).less(then)).not.toThrow();
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).less(then)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).less(then)).toThrow(expectedError);
    })
  })

  describe('not less', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      when(errorManager.less(then,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.less(then)).not.toThrow();
    })

    it('equal success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.less(entry)).not.toThrow();
    })

    it('less throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      when(errorManager.less(then,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.less(then)).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.less(then)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.less(then)).toThrow(expectedError);
    })
  })

  describe('greaterOrEqual', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greaterOrEqual(then)).not.toThrow();
    })

    it('equal success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greaterOrEqual(entry)).not.toThrow();
    })

    it('not greaterOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      when(errorManager.greaterOrEqual(then,entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greaterOrEqual(then)).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).greaterOrEqual(then)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).greaterOrEqual(then)).toThrow(expectedError);
    })
  })

  describe('not greaterOrEqual', () => {
    it('greaterOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      when(errorManager.greaterOrEqual(then,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greaterOrEqual(then)).toThrow(expectedError);
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.greaterOrEqual(entry,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greaterOrEqual(entry)).toThrow(expectedError);
    })

    it('not greaterOrEqual success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greaterOrEqual(then)).not.toThrow();
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.greaterOrEqual(then)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.greaterOrEqual(then)).toThrow(expectedError);
    })
  })

  describe('lessOrEqual', () => {
    it('not lessOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      when(errorManager.lessOrEqual(then,entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).lessOrEqual(then)).toThrow(expectedError);
    })

    it('equal success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).lessOrEqual(entry)).not.toThrow();
    })

    it('lessOrEqual success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).lessOrEqual(then)).not.toThrow();
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).lessOrEqual(then)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).lessOrEqual(then)).toThrow(expectedError);
    })
  })

  describe('not lessOrEqual', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      when(errorManager.lessOrEqual(then,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.lessOrEqual(then)).not.toThrow();
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.lessOrEqual(entry,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.lessOrEqual(entry)).toThrow(expectedError);
    })

    it('lessOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      when(errorManager.lessOrEqual(then,entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.lessOrEqual(then)).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.lessOrEqual(then)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.lessOrEqual(then)).toThrow(expectedError);
    })
  })

  describe('positive', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).positive()).not.toThrow();
    })

    it('zero throws', () => {
      let value = 0;
      when(errorManager.positive(value,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(value, instance(errorManager)).positive()).toThrow(expectedError);
    })

    it('not positive throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      when(errorManager.positive(entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).positive()).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).positive()).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).positive()).toThrow(expectedError);
    })
  })

  describe('not positive', () => {
    it('positive throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.positive(entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.positive()).toThrow(expectedError);
    })

    it('zero success', () => {
      let value = 0;
      //
      expect(() => new NumberVerifier(value, instance(errorManager)).not.positive()).not.toThrow();
    })

    it('not positive success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.positive()).not.toThrow();
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.positive()).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.positive()).toThrow(expectedError);
    })
  })

  describe('negative', () => {
    it('not negative throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.negative(entry,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).negative()).toThrow(expectedError);
    })

    it('zero throws', () => {
      let value = 0;
      when(errorManager.negative(value,true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(value, instance(errorManager)).negative()).toThrow(expectedError);
    })

    it('negative success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).negative()).not.toThrow();
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).negative()).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).negative()).toThrow(expectedError);
    })
  })

  describe('not negative', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.negative(entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.negative()).not.toThrow();
    })

    it('zero success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.negative()).not.toThrow();
    })

    it('negative throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      when(errorManager.negative(entry,false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.negative()).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.negative()).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.negative()).toThrow(expectedError);
    })
  })

  describe('inRange', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry-1, entry+1)).not.toThrow();
    })

    it('min equaly throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.inRange(entry, entry+1,entry, true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry, entry+1)).toThrow(expectedError);
    })

    it('max equaly throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.inRange(entry-1, entry,entry, true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry-1, entry)).toThrow(expectedError);
    })

    it('out of range throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      when(errorManager.inRange(entry+1, entry+2,entry, true)).thenReturn(errorMessage);
      when(errorManager.inRange(entry-2, entry-1,entry, true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry+1, entry+2)).toThrow(expectedError);
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry-2, entry-1)).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).inRange(range,range)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).inRange(range,range)).toThrow(expectedError);
    })
  })

  describe('not inRange', () => {
    it('in range throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.inRange(entry-1, entry+1,entry, false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.inRange(entry-1, entry+1)).toThrow(expectedError);
    })

    it('equaly success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.inRange(entry, entry+1)).not.toThrow();
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.inRange(entry-1, entry)).not.toThrow();
    })

    it('out of range success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.inRange(entry+1, entry+2)).not.toThrow();
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.inRange(entry-2, entry-1)).not.toThrow();
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.inRange(range,range)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.inRange(range,range)).toThrow(expectedError);
    })
  })

  describe('approximately', () => {
    it('success', () => {
      const entry = Forger.create<number>({numberFloat: true})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).approximately(entry+.1, .5)).not.toThrow();
    })

    it('equaly success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).approximately(entry, .1)).not.toThrow();
    })

    it('out of range throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      when(errorManager.approximately(entry+.8, entry, true)).thenReturn(errorMessage);
      when(errorManager.approximately(entry-.8, entry, true)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).approximately(entry+.8, .5)).toThrow(expectedError);
      expect(() => new NumberVerifier(entry, instance(errorManager)).approximately(entry-.8, .5)).toThrow(expectedError);
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).approximately(range,range)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).approximately(range,range)).toThrow(expectedError);
    })
  })

  describe('not approximately', () => {
    it('in range throws', () => {
      const entry = Forger.create<number>({numberFloat: true})!;
      when(errorManager.approximately(entry+.1, entry, false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.approximately(entry+.1, .5)).toThrow(expectedError);
    })

    it('equaly throws', () => {
      const entry = Forger.create<number>()!;
      when(errorManager.approximately(entry, entry, false)).thenReturn(errorMessage);
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.approximately(entry, .1)).toThrow(expectedError);
    })

    it('out of range success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.approximately(entry+.8, .5)).not.toThrow();
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.approximately(entry-.8, .5)).not.toThrow();
    })

    it('undefined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.approximately(range,range)).toThrow(expectedError);
    })

    it('null throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.approximately(range,range)).toThrow(expectedError);
    })
  })
})
