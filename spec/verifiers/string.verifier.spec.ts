import { StringVerifier } from "../../src/verifiers/string.verifier";
import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";

describe('StringVerifier', () => {

  describe('notEmpty', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).notEmpty()).not.toThrow();
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('').notEmpty()).toThrow(ShouldError);
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).notEmpty()).not.toThrow();
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).notEmpty()).not.toThrow();
    })
  })

  describe('beNullOrEmpty', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).beNullOrEmpty()).not.toThrow();
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('').beNullOrEmpty()).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).beNullOrEmpty()).not.toThrow();
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).beNullOrEmpty()).toThrow(ShouldError);
    })
  })

  describe('notNullOrEmpty', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).notNullOrEmpty()).toThrow(ShouldError);
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('').notNullOrEmpty()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).notNullOrEmpty()).toThrow(ShouldError);
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).notNullOrEmpty()).not.toThrow();
    })
  })

  describe('beEmpty', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).notEmpty()).not.toThrow();
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('').notEmpty()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).notEmpty()).not.toThrow();
    })
    it('not empty throws', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).notEmpty()).not.toThrow();
    })
  })

  describe('beWhiteSpace', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).beWhiteSpace()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).beWhiteSpace()).toThrow(ShouldError);
    })
    it('not empty throws', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).beWhiteSpace()).toThrow(ShouldError);
    })
    it('single whitespace success', () =>{
      expect(() => new StringVerifier(' ').beWhiteSpace()).not.toThrow();
    })
    it('a few whitespaces success', () =>{
      expect(() => new StringVerifier('   ').beWhiteSpace()).not.toThrow();
    })
  })

  describe('notWhiteSpace', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).notWhiteSpace()).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).notWhiteSpace()).not.toThrow();
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).notWhiteSpace()).not.toThrow();
    })
    it('single whitespace throws', () =>{
      expect(() => new StringVerifier(' ').notWhiteSpace()).toThrow(ShouldError);
    })
    it('a few whitespaces throws', () =>{
      expect(() => new StringVerifier('   ').notWhiteSpace()).toThrow(ShouldError);
    })
  })

  describe('beUpperCased', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).beUpperCased()).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).beUpperCased()).not.toThrow();
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ').beUpperCased()).not.toThrow();
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringUpCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).beUpperCased()).toThrow(ShouldError);
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).beUpperCased()).not.toThrow();
    })
  })

  describe('notBeUpperCased', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).notBeUpperCased()).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).notBeUpperCased()).not.toThrow();
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ').notBeUpperCased()).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).notBeUpperCased()).toThrow(ShouldError);
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringUpCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).notBeUpperCased()).not.toThrow();
    })
  })

  describe('notBeLowerCased', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).notBeLowerCased()).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).notBeLowerCased()).not.toThrow();
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ').notBeLowerCased()).not.toThrow();
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringUpCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).notBeLowerCased()).toThrow(ShouldError);
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).notBeLowerCased()).not.toThrow();
    })
  })

  describe('beLowerCased', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).beLowerCased()).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).beLowerCased()).not.toThrow();
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ').beLowerCased()).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).beLowerCased()).toThrow(ShouldError);
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringUpCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).beLowerCased()).not.toThrow();
    })
  })

  describe('equals', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).equals(null)).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).equals(undefined)).not.toThrow();
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('').equals('')).not.toThrow();
    })
    it('uppercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).equals(entry.toUpperCase())).toThrow(ShouldError);
    })
    it('lowercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).equals(entry.toLowerCase())).toThrow(ShouldError);
    })
    it('different throws', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).equals(other)).toThrow(ShouldError);
    })
    it('success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).equals(entry+'')).not.toThrow();
    })
  })

  describe('notEquals', () => {

    it('null success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).notEquals(null)).not.toThrow();
    })
    it('undefined success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).notEquals(undefined)).not.toThrow();
    })
    it('empty success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).notEquals('')).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).notEquals(entry.toUpperCase())).not.toThrow();
    })
    it('lowercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).notEquals(entry.toLowerCase())).not.toThrow();
    })
    it('different success', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).notEquals(other)).not.toThrow();
    })
    it('equals throws', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).equals(entry+'')).not.toThrow();
    })
  })

  describe('hasLength', () => {
    let strLength: number;
    let entry: string;

    beforeEach(() => {
      strLength = Forger.create<number>({numberMin: 5, numberMax: 20})!;
      entry = Forger.create<string>({stringLength: strLength})!;
    })

    it('greater throws', () =>{
      expect(() => new StringVerifier(entry).hasLength(strLength - 1)).toThrow(ShouldError);
    })
    it('smaller throws', () =>{
      expect(() => new StringVerifier(entry).hasLength(strLength + 1)).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).hasLength(strLength)).toThrow(ShouldError);
    })
    it('equal success', () =>{
      expect(() => new StringVerifier(entry).hasLength(strLength)).not.toThrow();
    })
  })
})
