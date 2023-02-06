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
})
