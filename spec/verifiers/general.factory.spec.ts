import { Forger } from "@artstesh/forger";
import { GeneralVerifier } from "../../src";
import { ShouldError } from "../../src/models/should.error";

describe('GeneralFactory', () => {
  describe('beTypeOf', () => {
    describe('direct', () =>{
      it("string success", function() {
        const entry = Forger.create<string>();
        //
        expect(() => new GeneralVerifier(entry).beTypeOf('string')).not.toThrow();
      });

      it("number success", function() {
        const entry = Forger.create<number>();
        //
        expect(() => new GeneralVerifier(entry).beTypeOf('number')).not.toThrow();
      });

      it("boolean success", function() {
        const entry = Forger.create<boolean>();
        //
        expect(() => new GeneralVerifier(entry).beTypeOf('boolean')).not.toThrow();
      });

      it("Date success", function() {
        const entry = Forger.create<Date>();
        //
        expect(() => new GeneralVerifier(entry).beTypeOf(Date)).not.toThrow();
      });
    })
    describe('with not', () =>{
      it("string throws", function() {
        const entry = Forger.create<string>();
        //
        expect(() => new GeneralVerifier(entry).not.beTypeOf('string')).toThrow(ShouldError);
      });

      it("number throws", function() {
        const entry = Forger.create<number>();
        //
        expect(() => new GeneralVerifier(entry).not.beTypeOf('number')).toThrow(ShouldError);
      });

      it("boolean throws", function() {
        const entry = Forger.create<boolean>();
        //
        expect(() => new GeneralVerifier(entry).not.beTypeOf('boolean')).toThrow(ShouldError);
      });

      it("Date throws", function() {
        const entry = Forger.create<Date>();
        //
        expect(() => new GeneralVerifier(entry).not.beTypeOf(Date)).toThrow(ShouldError);
      });
    })
  })

  describe('defined', () => {

    describe('direct', () => {
      it('null throws', () =>{
        expect(() => new GeneralVerifier(null).defined()).toThrow(ShouldError);
      })
      it('empty throws', () =>{
        expect(() => new GeneralVerifier('').defined()).not.toThrow();
      })
      it('undefined throws', () =>{
        expect(() => new GeneralVerifier(undefined).defined()).toThrow(ShouldError);
      })
      it('not empty success', () =>{
        const entry = Forger.create<string>();
        //
        expect(() => new GeneralVerifier(entry).defined()).not.toThrow();
      })
    })

    describe('with not', () => {
      it('null success', () =>{
        expect(() => new GeneralVerifier(null).not.defined()).not.toThrow();
      })
      it('empty throws', () =>{
        expect(() => new GeneralVerifier('').not.defined()).toThrow(ShouldError);
      })
      it('undefined success', () =>{
        expect(() => new GeneralVerifier(undefined).not.defined()).not.toThrow();
      })
      it('not empty success', () =>{
        const entry = Forger.create<string>();
        //
        expect(() => new GeneralVerifier(entry).not.defined()).toThrow(ShouldError);
      })
    })
  })
})
