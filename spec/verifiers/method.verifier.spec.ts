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
})
