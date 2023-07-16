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
    it('boolean success', () => {
      expect(() => VerifierFactory.getInstance().true(true)).not.toThrow();
    })
    it('string success', () => {
      const entry = Forger.create<string>();
      expect(() => VerifierFactory.getInstance().true(entry)).not.toThrow();
    })
    it('number success', () => {
      const entry = Forger.create<number>();
      expect(() => VerifierFactory.getInstance().true(entry)).not.toThrow();
    })
    it('zero number throws', () => {
      expect(() => VerifierFactory.getInstance().true(0)).toThrow(ShouldError);
    })
    it('boolean throws', () => {
      expect(() => VerifierFactory.getInstance().true(false)).toThrow(ShouldError);
    })
    it('empty string throws', () => {
      expect(() => VerifierFactory.getInstance().true('')).toThrow(ShouldError);
    })
    it('null throws', () => {
      expect(() => VerifierFactory.getInstance().true(null)).toThrow(ShouldError);
    })
    it('undefined throws', () => {
      expect(() => VerifierFactory.getInstance().true(undefined)).toThrow(ShouldError);
    })
    it('NaN throws', () => {
      const entry = Number(Forger.create<string>()!);
      expect(() => VerifierFactory.getInstance().true(entry)).toThrow(ShouldError);
    })
  })

  describe('false', () => {
    it('boolean success', () => {
      expect(() => VerifierFactory.getInstance().false(false)).not.toThrow();
    })
    it('empty string success', () => {
      expect(() => VerifierFactory.getInstance().false('')).not.toThrow();
    })
    it('null success', () => {
      expect(() => VerifierFactory.getInstance().false(null)).not.toThrow();
    })
    it('undefined success', () => {
      expect(() => VerifierFactory.getInstance().false(undefined)).not.toThrow();
    })
    it('NaN success', () => {
      const entry = Number(Forger.create<string>()!);
      expect(() => VerifierFactory.getInstance().false(entry)).not.toThrow();
    })
    it('boolean throws', () => {
      expect(() => VerifierFactory.getInstance().false(true)).toThrow(ShouldError);
    })
    it('string success', () => {
      const entry = Forger.create<string>();
      expect(() => VerifierFactory.getInstance().false(entry)).toThrow(ShouldError);
    })
    it('number success', () => {
      const entry = Forger.create<number>();
      expect(() => VerifierFactory.getInstance().false(entry)).toThrow(ShouldError);
    })
    it('zero number success', () => {
      expect(() => VerifierFactory.getInstance().false(0)).not.toThrow();
    })
  })
})
