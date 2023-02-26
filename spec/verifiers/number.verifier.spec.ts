import { Forger } from "@artstesh/forger";
import { NumberVerifier } from "../../src";
import { ShouldError } from "../../src/models/should.error";
import { instance, mock, reset } from "ts-mockito";
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
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).equals(expected)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).equals(expected)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).equals(expected)).toThrow(ShouldError);
    })
  })

  describe('not equals', () => {
    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.equals(entry)).toThrow(ShouldError);
    })

    it('not equal success', () => {
      const entry = Forger.create<number>()!;
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.equals(expected)).not.toThrow();
    })

    it('undefined success', () => {
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.equals(expected)).not.toThrow();
    })

    it('null success', () => {
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.equals(expected)).not.toThrow();
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
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greater(entry)).toThrow(ShouldError);
    })

    it('not greater throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greater(then)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).greater(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).greater(then)).toThrow(ShouldError);
    })
  })

  describe('not greater', () => {
    it('greater throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greater(then)).toThrow(ShouldError);
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
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.greater(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.greater(then)).toThrow(ShouldError);
    })
  })

  describe('less', () => {
    it('not less throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).less(then)).toThrow(ShouldError);
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).less(entry)).toThrow(ShouldError);
    })

    it('less success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).less(then)).not.toThrow();
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).less(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).less(then)).toThrow(ShouldError);
    })
  })

  describe('not less', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
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
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.less(then)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.less(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.less(then)).toThrow(ShouldError);
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
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).greaterOrEqual(then)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).greaterOrEqual(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).greaterOrEqual(then)).toThrow(ShouldError);
    })
  })

  describe('not greaterOrEqual', () => {
    it('greaterOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greaterOrEqual(then)).toThrow(ShouldError);
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greaterOrEqual(entry)).toThrow(ShouldError);
    })

    it('not greaterOrEqual success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.greaterOrEqual(then)).not.toThrow();
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.greaterOrEqual(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.greaterOrEqual(then)).toThrow(ShouldError);
    })
  })

  describe('lessOrEqual', () => {
    it('not lessOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).lessOrEqual(then)).toThrow(ShouldError);
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
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).lessOrEqual(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).lessOrEqual(then)).toThrow(ShouldError);
    })
  })

  describe('not lessOrEqual', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.lessOrEqual(then)).not.toThrow();
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.lessOrEqual(entry)).toThrow(ShouldError);
    })

    it('lessOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.lessOrEqual(then)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.lessOrEqual(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.lessOrEqual(then)).toThrow(ShouldError);
    })
  })

  describe('positive', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).positive()).not.toThrow();
    })

    it('zero throws', () => {
      //
      expect(() => new NumberVerifier(0, instance(errorManager)).positive()).toThrow(ShouldError);
    })

    it('not positive throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).positive()).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).positive()).toThrow(ShouldError);
    })

    it('null throws', () => {
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).positive()).toThrow(ShouldError);
    })
  })

  describe('not positive', () => {
    it('positive throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.positive()).toThrow(ShouldError);
    })

    it('zero success', () => {
      expect(() => new NumberVerifier(0, instance(errorManager)).not.positive()).not.toThrow();
    })

    it('not positive success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.positive()).not.toThrow();
    })

    it('undefined throws', () => {
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.positive()).toThrow(ShouldError);
    })

    it('null throws', () => {
      expect(() => new NumberVerifier(null, instance(errorManager)).not.positive()).toThrow(ShouldError);
    })
  })

  describe('negative', () => {
    it('not negative throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).negative()).toThrow(ShouldError);
    })

    it('zero throws', () => {
      //
      expect(() => new NumberVerifier(0, instance(errorManager)).negative()).toThrow(ShouldError);
    })

    it('negative success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).negative()).not.toThrow();
    })

    it('undefined throws', () => {
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).negative()).toThrow(ShouldError);
    })

    it('null throws', () => {
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).negative()).toThrow(ShouldError);
    })
  })

  describe('not negative', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
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
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.negative()).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.negative()).toThrow(ShouldError);
    })

    it('null throws', () => {
      expect(() => new NumberVerifier(null, instance(errorManager)).not.negative()).toThrow(ShouldError);
    })
  })

  describe('inRange', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry-1, entry+1)).not.toThrow();
    })

    it('equaly throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry, entry+1)).toThrow(ShouldError);
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry-1, entry)).toThrow(ShouldError);
    })

    it('out of range throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry+1, entry+2)).toThrow(ShouldError);
      expect(() => new NumberVerifier(entry, instance(errorManager)).inRange(entry-2, entry-1)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).inRange(range,range)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).inRange(range,range)).toThrow(ShouldError);
    })
  })

  describe('not inRange', () => {
    it('in range throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.inRange(entry-1, entry+1)).toThrow(ShouldError);
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
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.inRange(range,range)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.inRange(range,range)).toThrow(ShouldError);
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
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).approximately(entry+.8, .5)).toThrow(ShouldError);
      expect(() => new NumberVerifier(entry, instance(errorManager)).approximately(entry-.8, .5)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).approximately(range,range)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).approximately(range,range)).toThrow(ShouldError);
    })
  })

  describe('not approximately', () => {
    it('in range throws', () => {
      const entry = Forger.create<number>({numberFloat: true})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.approximately(entry+.1, .5)).toThrow(ShouldError);
    })

    it('equaly throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.approximately(entry, .1)).toThrow(ShouldError);
    })

    it('out of range success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.approximately(entry+.8, .5)).not.toThrow();
      expect(() => new NumberVerifier(entry, instance(errorManager)).not.approximately(entry-.8, .5)).not.toThrow();
    })

    it('undefined throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined, instance(errorManager)).not.approximately(range,range)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null, instance(errorManager)).not.approximately(range,range)).toThrow(ShouldError);
    })
  })
})
