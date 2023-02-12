import { StringVerifier } from "../../src/verifiers/string.verifier";
import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { Times } from "../../src/verifiers/utils/times.counter";

describe('StringVerifier', () => {

  describe('empty', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).empty()).toThrow(ShouldError);
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('').empty()).not.toThrow();
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).empty()).toThrow(ShouldError);
    })
    it('not empty throws', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).empty()).toThrow(ShouldError);
    })
  })

  describe('not empty', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).not.empty()).toThrow(ShouldError);
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('').not.empty()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).not.empty()).toThrow(ShouldError);
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).not.empty()).not.toThrow();
    })
  })

  describe('defined', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).defined()).toThrow(ShouldError);
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('').defined()).not.toThrow();
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).defined()).toThrow(ShouldError);
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).defined()).not.toThrow();
    })
  })

  describe('not defined', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).not.defined()).not.toThrow();
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('').not.defined()).toThrow(ShouldError);
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).not.defined()).not.toThrow();
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).not.defined()).toThrow(ShouldError);
    })
  })

  describe('whitespace', () => {
    it('empty success', () =>{
      expect(() => new StringVerifier('').whitespace()).not.toThrow();
    })

    it('null throws', () =>{
      expect(() => new StringVerifier(null).whitespace()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).whitespace()).toThrow(ShouldError);
    })
    it('not empty throws', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).whitespace()).toThrow(ShouldError);
    })
    it('single whitespace success', () =>{
      expect(() => new StringVerifier(' ').whitespace()).not.toThrow();
    })
    it('a few whitespaces success', () =>{
      expect(() => new StringVerifier('   ').whitespace()).not.toThrow();
    })
  })

  describe('not whitespace', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).not.whitespace()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).not.whitespace()).toThrow(ShouldError);
    })

    it('empty throws', () =>{
      expect(() => new StringVerifier('').not.whitespace()).toThrow(ShouldError);
    })

    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry).not.whitespace()).not.toThrow();
    })
    it('single whitespace throws', () =>{
      expect(() => new StringVerifier(' ').not.whitespace()).toThrow(ShouldError);
    })
    it('a few whitespaces throws', () =>{
      expect(() => new StringVerifier('   ').not.whitespace()).toThrow(ShouldError);
    })
  })

  describe('upperCased', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).upperCased()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).upperCased()).toThrow(ShouldError);
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('').upperCased()).not.toThrow();
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ').upperCased()).not.toThrow();
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50});
      //
      expect(() => new StringVerifier(entry).upperCased()).toThrow(ShouldError);
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).upperCased()).not.toThrow();
    })
  })

  describe('not upperCased', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).not.upperCased()).toThrow(ShouldError);
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).not.upperCased()).toThrow(ShouldError);
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('').not.upperCased()).not.toThrow();
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ').not.upperCased()).not.toThrow();
    })
    it('uppercased throws', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).not.upperCased()).toThrow(ShouldError);
    })
    it('not uppercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50});
      //
      expect(() => new StringVerifier(entry).not.upperCased()).not.toThrow();
    })
  })

  describe('not lowerCased', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).not.lowerCased()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).not.lowerCased()).toThrow(ShouldError);
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ').not.lowerCased()).not.toThrow();
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('').not.lowerCased()).not.toThrow();
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringUpCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).not.lowerCased()).toThrow(ShouldError);
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).not.lowerCased()).not.toThrow();
    })
  })

  describe('lowerCased', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).lowerCased()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).lowerCased()).toThrow(ShouldError);
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ').lowerCased()).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).lowerCased()).toThrow(ShouldError);
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringUpCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry).lowerCased()).not.toThrow();
    })
  })

  describe('equals', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null).equals(null)).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined).equals(undefined)).toThrow(ShouldError);
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
      expect(() => new StringVerifier(entry).not.equals(null)).not.toThrow();
    })
    it('undefined success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equals(undefined)).not.toThrow();
    })
    it('empty success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equals('')).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).not.equals(entry.toUpperCase())).not.toThrow();
    })
    it('lowercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).not.equals(entry.toLowerCase())).not.toThrow();
    })
    it('different success', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equals(other)).not.toThrow();
    })
    it('equals throws', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equals(entry+'')).toThrow(ShouldError);
    })
  })

  describe('equalsIgnoreCase', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null).equalsIgnoreCase(null)).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined).equalsIgnoreCase(undefined)).not.toThrow();
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('').equalsIgnoreCase('')).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).equalsIgnoreCase(entry.toUpperCase())).not.toThrow();
    })
    it('lowercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).equalsIgnoreCase(entry.toLowerCase())).not.toThrow();
    })
    it('different throws', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).equalsIgnoreCase(other)).toThrow(ShouldError);
    })
    it('success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).equalsIgnoreCase(entry+'')).not.toThrow();
    })
  })

  describe('notEqualsIgnoreCase', () => {

    it('null success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equalsIgnoreCase(null)).not.toThrow();
    })
    it('undefined success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equalsIgnoreCase(undefined)).not.toThrow();
    })
    it('empty success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equalsIgnoreCase('')).not.toThrow();
    })
    it('uppercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).not.equalsIgnoreCase(entry.toUpperCase())).toThrow(ShouldError);
    })
    it('lowercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry).not.equalsIgnoreCase(entry.toLowerCase())).toThrow(ShouldError);
    })
    it('equals throws', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equalsIgnoreCase(entry+'')).toThrow(ShouldError);
    })
    it('different success', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).not.equalsIgnoreCase(other)).not.toThrow();
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

  describe('contains', () => {

    it("entry undefined throws", () => {
      const expected = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(undefined).contains(expected)).toThrow(ShouldError);
    });

    it("entry null throws", () => {
      const expected = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(null).contains(expected)).toThrow(ShouldError);
    });

    it("not contains throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).contains(expected)).toThrow(ShouldError);
    });

    it("contains once success", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.once())).not.toThrow();
    });

    it("not contains once throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.once())).toThrow(ShouldError);
    });

    it("contains twice success", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(2).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.twice())).not.toThrow();
    });

    it("not contains twice throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.twice())).toThrow(ShouldError);
    });

    it("contains exactly success", () => {
      const exactly = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(exactly).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.exactly(exactly))).not.toThrow();
    });

    it("not contains exactly throws", () => {
      const exactly = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entryMore = Forger.create<string>()! + new Array(exactly+1).fill(expected).join('');
      const entryLess = Forger.create<string>()! + new Array(exactly-1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entryMore).contains(expected, Times.exactly(exactly))).toThrow(ShouldError);
      expect(() => new StringVerifier(entryLess).contains(expected, Times.exactly(exactly))).toThrow(ShouldError);
    });

    it("contains lessThan success", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.lessThan(repeats+1))).not.toThrow();
    });

    it("not contains lessThan throws", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.lessThan(repeats-1))).toThrow(ShouldError);
    });

    it("contains moreThan success", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.moreThan(repeats-1))).not.toThrow();
    });

    it("not contains moreThan throws", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).contains(expected, Times.moreThan(repeats+1))).toThrow(ShouldError);
    });
  })

  describe('containsIgnoreCase', () => {

    it("entry undefined throws", () => {
      const expected = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(undefined).containsIgnoreCase(expected)).toThrow(ShouldError);
    });

    it("entry null throws", () => {
      const expected = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(null).containsIgnoreCase(expected)).toThrow(ShouldError);
    });

    it("not contains throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected)).toThrow(ShouldError);
    });

    it("contains once success", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.once())).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toUpperCase(), Times.once())).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toLowerCase(), Times.once())).not.toThrow();
    });

    it("not contains once throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.once())).toThrow(ShouldError);
    });

    it("contains twice success", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(2).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.twice())).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toUpperCase(), Times.twice())).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toLowerCase(), Times.twice())).not.toThrow();
    });

    it("not contains twice throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.twice())).toThrow(ShouldError);
    });

    it("contains exactly success", () => {
      const exactly = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(exactly).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.exactly(exactly))).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toLowerCase(), Times.exactly(exactly))).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toUpperCase(), Times.exactly(exactly))).not.toThrow();
    });

    it("not contains exactly throws", () => {
      const exactly = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entryMore = Forger.create<string>()! + new Array(exactly+1).fill(expected).join('');
      const entryLess = Forger.create<string>()! + new Array(exactly-1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entryMore).containsIgnoreCase(expected, Times.exactly(exactly))).toThrow(ShouldError);
      expect(() => new StringVerifier(entryLess).containsIgnoreCase(expected, Times.exactly(exactly))).toThrow(ShouldError);
    });

    it("contains lessThan success", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.lessThan(repeats+1))).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toLowerCase(), Times.lessThan(repeats+1))).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toUpperCase(), Times.lessThan(repeats+1))).not.toThrow();
    });

    it("not contains lessThan throws", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.lessThan(repeats-1))).toThrow(ShouldError);
    });

    it("contains moreThan success", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.moreThan(repeats-1))).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toLowerCase(), Times.moreThan(repeats-1))).not.toThrow();
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected.toUpperCase(), Times.moreThan(repeats-1))).not.toThrow();
    });

    it("not contains moreThan throws", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry).containsIgnoreCase(expected, Times.moreThan(repeats+1))).toThrow(ShouldError);
    });
  })

  describe('containsAny', () => {

    it("entry undefined throws", () => {
      const expected = Forger.create<string[]>()!;
      //
      expect(() => new StringVerifier(undefined).containsAny(...expected)).toThrow(ShouldError);
    });

    it("entry null throws", () => {
      const expected = Forger.create<string[]>()!;
      //
      expect(() => new StringVerifier(null).containsAny(...expected)).toThrow(ShouldError);
    });

    it("not contains throws", () => {
      const expected = Forger.create<string[]>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).containsAny(...expected)).toThrow(ShouldError);
    });

    it("contains success", () => {
      const expected = Forger.create<string[]>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected[0]).join('');
      //
      expect(() => new StringVerifier(entry).containsAny(...expected)).not.toThrow();
    });
  })

  describe('containsAnyIgnoreCase', () => {

    it("entry undefined throws", () => {
      const expected = Forger.create<string[]>()!;
      //
      expect(() => new StringVerifier(undefined).containsAnyIgnoreCase(...expected)).toThrow(ShouldError);
    });

    it("entry null throws", () => {
      const expected = Forger.create<string[]>()!;
      //
      expect(() => new StringVerifier(null).containsAnyIgnoreCase(...expected)).toThrow(ShouldError);
    });

    it("not contains throws", () => {
      const expected = Forger.create<string[]>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry).containsAnyIgnoreCase(...expected)).toThrow(ShouldError);
    });

    it("contains success", () => {
      const expected = Forger.create<string[]>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected[0]).join('');
      //
      expect(() => new StringVerifier(entry).containsAnyIgnoreCase(...expected)).not.toThrow();
    });
  })
})
