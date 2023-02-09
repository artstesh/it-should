import { Forger } from "@artstesh/forger";
import { NumberVerifier } from "../../src/verifiers/number.verifier";
import { ShouldError } from "../../src/models/should.error";

describe('NumberVerifier', () => {

  describe('equals', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).equals(entry)).not.toThrow();
    })

    it('not equal throws', () => {
      const entry = Forger.create<number>()!;
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).equals(expected)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).equals(expected)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).equals(expected)).toThrow(ShouldError);
    })
  })

  describe('not equals', () => {
    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.equals(entry)).toThrow(ShouldError);
    })

    it('not equal success', () => {
      const entry = Forger.create<number>()!;
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.equals(expected)).not.toThrow();
    })

    it('undefined success', () => {
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).not.equals(expected)).not.toThrow();
    })

    it('null success', () => {
      const expected = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).not.equals(expected)).not.toThrow();
    })
  })

  describe('greater', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).greater(then)).not.toThrow();
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).greater(entry)).toThrow(ShouldError);
    })

    it('not greater throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).greater(then)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).greater(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).greater(then)).toThrow(ShouldError);
    })
  })

  describe('not greater', () => {
    it('greater throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.greater(then)).toThrow(ShouldError);
    })

    it('equal success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.greater(entry)).not.toThrow();
    })

    it('not greater success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.greater(then)).not.toThrow();
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).not.greater(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).not.greater(then)).toThrow(ShouldError);
    })
  })

  describe('less', () => {
    it('not less throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).less(then)).toThrow(ShouldError);
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).less(entry)).toThrow(ShouldError);
    })

    it('less success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).less(then)).not.toThrow();
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).less(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).less(then)).toThrow(ShouldError);
    })
  })

  describe('not less', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.less(then)).not.toThrow();
    })

    it('equal success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.less(entry)).not.toThrow();
    })

    it('less throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.less(then)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).not.less(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).not.less(then)).toThrow(ShouldError);
    })
  })

  describe('greaterOrEqual', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).greaterOrEqual(then)).not.toThrow();
    })

    it('equal success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).greaterOrEqual(entry)).not.toThrow();
    })

    it('not greaterOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).greaterOrEqual(then)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).greaterOrEqual(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).greaterOrEqual(then)).toThrow(ShouldError);
    })
  })

  describe('not greaterOrEqual', () => {
    it('greaterOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.greaterOrEqual(then)).toThrow(ShouldError);
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.greaterOrEqual(entry)).toThrow(ShouldError);
    })

    it('not greaterOrEqual success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.greaterOrEqual(then)).not.toThrow();
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).not.greaterOrEqual(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).not.greaterOrEqual(then)).toThrow(ShouldError);
    })
  })

  describe('lessOrEqual', () => {
    it('not lessOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).lessOrEqual(then)).toThrow(ShouldError);
    })

    it('equal success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).lessOrEqual(entry)).not.toThrow();
    })

    it('lessOrEqual success', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).lessOrEqual(then)).not.toThrow();
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).lessOrEqual(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).lessOrEqual(then)).toThrow(ShouldError);
    })
  })

  describe('not lessOrEqual', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      const then = entry - Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.lessOrEqual(then)).not.toThrow();
    })

    it('equal throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.lessOrEqual(entry)).toThrow(ShouldError);
    })

    it('lessOrEqual throws', () => {
      const entry = Forger.create<number>()!;
      const then = entry + Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.lessOrEqual(then)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).not.lessOrEqual(then)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const then = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).not.lessOrEqual(then)).toThrow(ShouldError);
    })
  })

  describe('positive', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).positive()).not.toThrow();
    })

    it('zero throws', () => {
      //
      expect(() => new NumberVerifier(0).positive()).toThrow(ShouldError);
    })

    it('not positive throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry).positive()).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      //
      expect(() => new NumberVerifier(undefined).positive()).toThrow(ShouldError);
    })

    it('null throws', () => {
      //
      expect(() => new NumberVerifier(null).positive()).toThrow(ShouldError);
    })
  })

  describe('not positive', () => {
    it('positive throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.positive()).toThrow(ShouldError);
    })

    it('zero success', () => {
      expect(() => new NumberVerifier(0).not.positive()).not.toThrow();
    })

    it('not positive success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry).not.positive()).not.toThrow();
    })

    it('undefined throws', () => {
      expect(() => new NumberVerifier(undefined).not.positive()).toThrow(ShouldError);
    })

    it('null throws', () => {
      expect(() => new NumberVerifier(null).not.positive()).toThrow(ShouldError);
    })
  })

  describe('negative', () => {
    it('not negative throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).negative()).toThrow(ShouldError);
    })

    it('zero throws', () => {
      //
      expect(() => new NumberVerifier(0).negative()).toThrow(ShouldError);
    })

    it('negative success', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry).negative()).not.toThrow();
    })

    it('undefined throws', () => {
      //
      expect(() => new NumberVerifier(undefined).negative()).toThrow(ShouldError);
    })

    it('null throws', () => {
      //
      expect(() => new NumberVerifier(null).negative()).toThrow(ShouldError);
    })
  })

  describe('not negative', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.negative()).not.toThrow();
    })

    it('zero success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).not.negative()).not.toThrow();
    })

    it('negative throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry).not.negative()).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      expect(() => new NumberVerifier(undefined).not.negative()).toThrow(ShouldError);
    })

    it('null throws', () => {
      expect(() => new NumberVerifier(null).not.negative()).toThrow(ShouldError);
    })
  })

  describe('inRange', () => {
    it('success', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).inRange(entry-1, entry+1)).not.toThrow();
    })

    it('equaly throws', () => {
      const entry = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(entry).inRange(entry, entry+1)).toThrow(ShouldError);
      expect(() => new NumberVerifier(entry).inRange(entry-1, entry)).toThrow(ShouldError);
    })

    it('out of range throws', () => {
      const entry = Forger.create<number>({numberMin: -1000, numberMax: 0})!;
      //
      expect(() => new NumberVerifier(entry).inRange(entry+1, entry+2)).toThrow(ShouldError);
      expect(() => new NumberVerifier(entry).inRange(entry-2, entry-1)).toThrow(ShouldError);
    })

    it('undefined throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(undefined).inRange(range,range)).toThrow(ShouldError);
    })

    it('null throws', () => {
      const range = Forger.create<number>()!;
      //
      expect(() => new NumberVerifier(null).inRange(range,range)).toThrow(ShouldError);
    })
  })
})
