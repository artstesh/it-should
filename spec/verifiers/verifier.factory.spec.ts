import {
  ArrayVerifier,
  DateVerifier,
  NumberVerifier,
  ObjectsVerifier,
  StringVerifier,
  VerifierFactory
} from "../../src";
import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";

describe('VerifierFactory', () => {

  it('creates number verifier', () => {
    const result = VerifierFactory.getInstance().number(Forger.create<number>());
    //
    expect(typeof result == typeof NumberVerifier)
  })

  it('creates string verifier', () => {
    const result = VerifierFactory.getInstance().string(Forger.create<string>());
    //
    expect(typeof result == typeof StringVerifier)
  })

  it('creates objects verifier', () => {
    interface Test {field: string}
    const result = VerifierFactory.getInstance().objects(Forger.create<Test>(), Forger.create<Test>());
    //
    expect(typeof result == typeof ObjectsVerifier)
  })

  it('creates array verifier', () => {
    const result = VerifierFactory.getInstance().array(Forger.create<string[]>());
    //
    expect(typeof result == typeof ArrayVerifier)
  })

  it('creates date verifier', () => {
    const result = VerifierFactory.getInstance().date(Forger.create<Date>());
    //
    expect(typeof result == typeof DateVerifier)
  })

  describe('true', () => {
    it('success', () => {
      expect(() => VerifierFactory.getInstance().true(true)).not.toThrow();
    })
    it('throws', () => {
      expect(() => VerifierFactory.getInstance().true(false)).toThrow(ShouldError);
    })
  })

  describe('false', () => {
    it('success', () => {
      expect(() => VerifierFactory.getInstance().false(false)).not.toThrow();
    })
    it('throws', () => {
      expect(() => VerifierFactory.getInstance().false(true)).toThrow(ShouldError);
    })
  })
})
