import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { instance, mock, reset, when } from "ts-mockito";
import { MethodError } from "../../src/errors/method.error";
import { MethodVerifier } from "../../src/verifiers/method.verifier";

describe('MethodVerifier', () => {
  const errorManager = mock(MethodError);
  let expectedError: ShouldError;
  let errorMessage: string;

  beforeEach(() => {
    errorMessage = Forger.create<string>()!;
    expectedError = new ShouldError(errorMessage);
  })

  afterEach(() => {
    reset(errorManager);
  })

  describe('throws', () => {
    describe('direct', () => {

      it('successfully throws', () => {
        const entry = () => {
          throw new Error();
        };
        //
        expect(() => new MethodVerifier(entry,instance(errorManager)).throws()).not.toThrow();
      })

      it('failed to throw', () => {
        const entry = () => true;
        when(errorManager.throws(true)).thenReturn(errorMessage);
        //
        expect(() => new MethodVerifier(entry,instance(errorManager)).throws()).toThrow(expectedError);
      })

      it('passes arguments to the function', () => {
        const entry = (x: number) => {
          if (x > 0) throw new Error();
          return x;
        };
        when(errorManager.throws(true)).thenReturn(errorMessage);
        //
        expect(() => new MethodVerifier(entry,instance(errorManager)).throws(1)).not.toThrow();
        expect(() => new MethodVerifier(entry,instance(errorManager)).throws(-1)).toThrow(expectedError);
      })
    })
    describe('with not', () => {

      it('successfully throws', () => {
        const entry = () => {
          throw new Error();
        };
        when(errorManager.throws(false)).thenReturn(errorMessage);
        //
        expect(() => new MethodVerifier(entry,instance(errorManager)).not.throws()).toThrow(expectedError);
      })

      it('failed to throw', () => {
        const entry = () => true;
        //
        expect(() => new MethodVerifier(entry,instance(errorManager)).not.throws()).not.toThrow();
      })
    })
  })

  describe('returns', () => {
    describe('direct', () => {

      it('returns the produced value', () => {
        const expected = Forger.create<string>()!;
        const entry = () => expected;
        //
        expect(new MethodVerifier(entry,instance(errorManager)).returns()).toEqual(expected);
      })

      it('passes arguments to the function', () => {
        const entry = (x: number, y: number) => x * y;
        const expected = Forger.create<number>()!;
        //
        expect(new MethodVerifier(entry,instance(errorManager)).returns(expected, 2)).toEqual(expected * 2);
      })

      it('throws when the function throws', () => {
        const entry = () => {
          throw new Error();
        };
        when(errorManager.returns(true)).thenReturn(errorMessage);
        //
        expect(() => new MethodVerifier(entry,instance(errorManager)).returns()).toThrow(expectedError);
      })
    })
    describe('with not', () => {

      it('passes and returns nothing when the function throws', () => {
        const entry = () => {
          throw new Error();
        };
        //
        expect(new MethodVerifier(entry,instance(errorManager)).not.returns()).toBeUndefined();
      })

      it('throws when the function returns a value', () => {
        const entry = () => Forger.create<number>()!;
        when(errorManager.returns(false)).thenReturn(errorMessage);
        //
        expect(() => new MethodVerifier(entry,instance(errorManager)).not.returns()).toThrow(expectedError);
      })
    })
  })

  describe('defined', () => {

    it('not defined throws', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new MethodVerifier(undefined,instance(errorManager)).throws()).toThrow(expectedError);
      expect(() => new MethodVerifier(null,instance(errorManager)).returns()).toThrow(expectedError);
    })

    it('not defined throws regardless of not', () => {
      when(errorManager.defined(true)).thenReturn(errorMessage);
      //
      expect(() => new MethodVerifier(undefined,instance(errorManager)).not.throws()).toThrow(expectedError);
    })

    it('not defined is the legal negation', () => {
      //
      expect(() => new MethodVerifier(undefined,instance(errorManager)).not.defined()).not.toThrow();
    })
  })
})
