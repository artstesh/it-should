import { StringVerifier } from "../../src";
import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { Times } from "../../src";
import { instance, mock, reset } from "ts-mockito";
import { StringError } from "../../src/errors/string.error";

describe('StringVerifier', () => {
  const errorManager = mock(StringError);
  let expectedError: ShouldError;
  let errorMessage: string;

  beforeEach(() => {
    errorMessage = Forger.create<string>()!;
    expectedError = new ShouldError(errorMessage);
  })

  afterEach(() => {
    reset(errorManager);
  })

  describe('empty', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).empty()).toThrow(ShouldError);
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).empty()).not.toThrow();
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).empty()).toThrow(ShouldError);
    })
    it('not empty throws', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).empty()).toThrow(ShouldError);
    })
  })

  describe('not empty', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).not.empty()).toThrow(ShouldError);
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).not.empty()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).not.empty()).toThrow(ShouldError);
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.empty()).not.toThrow();
    })
  })

  describe('defined', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).defined()).toThrow(ShouldError);
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).defined()).not.toThrow();
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).defined()).toThrow(ShouldError);
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).defined()).not.toThrow();
    })
  })

  describe('not defined', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).not.defined()).not.toThrow();
    })
    it('empty throws', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).not.defined()).toThrow(ShouldError);
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).not.defined()).not.toThrow();
    })
    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.defined()).toThrow(ShouldError);
    })
  })

  describe('whitespace', () => {
    it('empty success', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).whitespace()).not.toThrow();
    })

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).whitespace()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).whitespace()).toThrow(ShouldError);
    })
    it('not empty throws', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).whitespace()).toThrow(ShouldError);
    })
    it('single whitespace success', () =>{
      expect(() => new StringVerifier(' ', instance(errorManager)).whitespace()).not.toThrow();
    })
    it('a few whitespaces success', () =>{
      expect(() => new StringVerifier('   ', instance(errorManager)).whitespace()).not.toThrow();
    })
  })

  describe('not whitespace', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).not.whitespace()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).not.whitespace()).toThrow(ShouldError);
    })

    it('empty throws', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).not.whitespace()).toThrow(ShouldError);
    })

    it('not empty success', () =>{
      const entry = Forger.create<string>();
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.whitespace()).not.toThrow();
    })
    it('single whitespace throws', () =>{
      expect(() => new StringVerifier(' ', instance(errorManager)).not.whitespace()).toThrow(ShouldError);
    })
    it('a few whitespaces throws', () =>{
      expect(() => new StringVerifier('   ', instance(errorManager)).not.whitespace()).toThrow(ShouldError);
    })
  })

  describe('upperCased', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).upperCased()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).upperCased()).toThrow(ShouldError);
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).upperCased()).not.toThrow();
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ', instance(errorManager)).upperCased()).not.toThrow();
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50});
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).upperCased()).toThrow(ShouldError);
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).upperCased()).not.toThrow();
    })
  })

  describe('not upperCased', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).not.upperCased()).toThrow(ShouldError);
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).not.upperCased()).toThrow(ShouldError);
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).not.upperCased()).not.toThrow();
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ', instance(errorManager)).not.upperCased()).not.toThrow();
    })
    it('uppercased throws', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.upperCased()).toThrow(ShouldError);
    })
    it('not uppercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50});
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.upperCased()).not.toThrow();
    })
  })

  describe('not lowerCased', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).not.lowerCased()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).not.lowerCased()).toThrow(ShouldError);
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ', instance(errorManager)).not.lowerCased()).not.toThrow();
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).not.lowerCased()).not.toThrow();
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringUpCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.lowerCased()).toThrow(ShouldError);
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.lowerCased()).not.toThrow();
    })
  })

  describe('lowerCased', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).lowerCased()).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).lowerCased()).toThrow(ShouldError);
    })
    it('whitespace success', () =>{
      expect(() => new StringVerifier(' ', instance(errorManager)).lowerCased()).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLowCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).lowerCased()).toThrow(ShouldError);
    })
    it('not uppercased throws', () =>{
      const entry = Forger.create<string>({stringUpCase: false, stringLength: 50});
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).lowerCased()).not.toThrow();
    })
  })

  describe('equals', () => {

    it('null throws', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).equals(null)).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).equals(undefined)).toThrow(ShouldError);
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).equals('')).not.toThrow();
    })
    it('uppercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).equals(entry.toUpperCase())).toThrow(ShouldError);
    })
    it('lowercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).equals(entry.toLowerCase())).toThrow(ShouldError);
    })
    it('different throws', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).equals(other)).toThrow(ShouldError);
    })
    it('success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).equals(entry+'')).not.toThrow();
    })
  })

  describe('notEquals', () => {

    it('null success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equals(null)).not.toThrow();
    })
    it('undefined success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equals(undefined)).not.toThrow();
    })
    it('empty success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equals('')).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equals(entry.toUpperCase())).not.toThrow();
    })
    it('lowercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equals(entry.toLowerCase())).not.toThrow();
    })
    it('different success', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equals(other)).not.toThrow();
    })
    it('equals throws', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equals(entry+'')).toThrow(ShouldError);
    })
  })

  describe('equalsIgnoreCase', () => {

    it('null success', () =>{
      expect(() => new StringVerifier(null, instance(errorManager)).equalsIgnoreCase(null)).not.toThrow();
    })
    it('undefined success', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).equalsIgnoreCase(undefined)).not.toThrow();
    })
    it('empty success', () =>{
      expect(() => new StringVerifier('', instance(errorManager)).equalsIgnoreCase('')).not.toThrow();
    })
    it('uppercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).equalsIgnoreCase(entry.toUpperCase())).not.toThrow();
    })
    it('lowercased success', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).equalsIgnoreCase(entry.toLowerCase())).not.toThrow();
    })
    it('different throws', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).equalsIgnoreCase(other)).toThrow(ShouldError);
    })
    it('success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).equalsIgnoreCase(entry+'')).not.toThrow();
    })
  })

  describe('notEqualsIgnoreCase', () => {

    it('null success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equalsIgnoreCase(null)).not.toThrow();
    })
    it('undefined success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equalsIgnoreCase(undefined)).not.toThrow();
    })
    it('empty success', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equalsIgnoreCase('')).not.toThrow();
    })
    it('uppercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equalsIgnoreCase(entry.toUpperCase())).toThrow(ShouldError);
    })
    it('lowercased throws', () =>{
      const entry = Forger.create<string>({stringLength: 50})!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equalsIgnoreCase(entry.toLowerCase())).toThrow(ShouldError);
    })
    it('equals throws', () =>{
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equalsIgnoreCase(entry+'')).toThrow(ShouldError);
    })
    it('different success', () =>{
      const entry = Forger.create<string>()!;
      const other = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).not.equalsIgnoreCase(other)).not.toThrow();
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
      expect(() => new StringVerifier(entry, instance(errorManager)).hasLength(strLength - 1)).toThrow(ShouldError);
    })
    it('smaller throws', () =>{
      expect(() => new StringVerifier(entry, instance(errorManager)).hasLength(strLength + 1)).toThrow(ShouldError);
    })
    it('undefined throws', () =>{
      expect(() => new StringVerifier(undefined, instance(errorManager)).hasLength(strLength)).toThrow(ShouldError);
    })
    it('equal success', () =>{
      expect(() => new StringVerifier(entry, instance(errorManager)).hasLength(strLength)).not.toThrow();
    })
  })

  describe('contains', () => {

    it("entry undefined throws", () => {
      const expected = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(undefined, instance(errorManager)).contains(expected)).toThrow(ShouldError);
    });

    it("entry null throws", () => {
      const expected = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(null, instance(errorManager)).contains(expected)).toThrow(ShouldError);
    });

    it("not contains throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected)).toThrow(ShouldError);
    });

    it("contains once success", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.once())).not.toThrow();
    });

    it("not contains once throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.once())).toThrow(ShouldError);
    });

    it("contains twice success", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(2).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.twice())).not.toThrow();
    });

    it("not contains twice throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.twice())).toThrow(ShouldError);
    });

    it("contains exactly success", () => {
      const exactly = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(exactly).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.exactly(exactly))).not.toThrow();
    });

    it("not contains exactly throws", () => {
      const exactly = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entryMore = Forger.create<string>()! + new Array(exactly+1).fill(expected).join('');
      const entryLess = Forger.create<string>()! + new Array(exactly-1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entryMore, instance(errorManager)).contains(expected, Times.exactly(exactly))).toThrow(ShouldError);
      expect(() => new StringVerifier(entryLess, instance(errorManager)).contains(expected, Times.exactly(exactly))).toThrow(ShouldError);
    });

    it("contains lessThan success", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.lessThan(repeats+1))).not.toThrow();
    });

    it("not contains lessThan throws", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.lessThan(repeats-1))).toThrow(ShouldError);
    });

    it("contains moreThan success", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.moreThan(repeats-1))).not.toThrow();
    });

    it("not contains moreThan throws", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).contains(expected, Times.moreThan(repeats+1))).toThrow(ShouldError);
    });
  })

  describe('containsIgnoreCase', () => {

    it("entry undefined throws", () => {
      const expected = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(undefined, instance(errorManager)).containsIgnoreCase(expected)).toThrow(ShouldError);
    });

    it("entry null throws", () => {
      const expected = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(null, instance(errorManager)).containsIgnoreCase(expected)).toThrow(ShouldError);
    });

    it("not contains throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected)).toThrow(ShouldError);
    });

    it("contains once success", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.once())).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toUpperCase(), Times.once())).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toLowerCase(), Times.once())).not.toThrow();
    });

    it("not contains once throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.once())).toThrow(ShouldError);
    });

    it("contains twice success", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(2).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.twice())).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toUpperCase(), Times.twice())).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toLowerCase(), Times.twice())).not.toThrow();
    });

    it("not contains twice throws", () => {
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.twice())).toThrow(ShouldError);
    });

    it("contains exactly success", () => {
      const exactly = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(exactly).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.exactly(exactly))).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toLowerCase(), Times.exactly(exactly))).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toUpperCase(), Times.exactly(exactly))).not.toThrow();
    });

    it("not contains exactly throws", () => {
      const exactly = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entryMore = Forger.create<string>()! + new Array(exactly+1).fill(expected).join('');
      const entryLess = Forger.create<string>()! + new Array(exactly-1).fill(expected).join('');
      //
      expect(() => new StringVerifier(entryMore, instance(errorManager)).containsIgnoreCase(expected, Times.exactly(exactly))).toThrow(ShouldError);
      expect(() => new StringVerifier(entryLess, instance(errorManager)).containsIgnoreCase(expected, Times.exactly(exactly))).toThrow(ShouldError);
    });

    it("contains lessThan success", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.lessThan(repeats+1))).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toLowerCase(), Times.lessThan(repeats+1))).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toUpperCase(), Times.lessThan(repeats+1))).not.toThrow();
    });

    it("not contains lessThan throws", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.lessThan(repeats-1))).toThrow(ShouldError);
    });

    it("contains moreThan success", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.moreThan(repeats-1))).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toLowerCase(), Times.moreThan(repeats-1))).not.toThrow();
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected.toUpperCase(), Times.moreThan(repeats-1))).not.toThrow();
    });

    it("not contains moreThan throws", () => {
      const repeats = Forger.create<number>({numberMin: 1, numberMax: 5})!;
      const expected = Forger.create<string>()!;
      const entry = Forger.create<string>()! + new Array(repeats).fill(expected).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsIgnoreCase(expected, Times.moreThan(repeats+1))).toThrow(ShouldError);
    });
  })

  describe('containsAny', () => {

    it("entry undefined throws", () => {
      const expected = Forger.create<string[]>()!;
      //
      expect(() => new StringVerifier(undefined, instance(errorManager)).containsAny(...expected)).toThrow(ShouldError);
    });

    it("entry null throws", () => {
      const expected = Forger.create<string[]>()!;
      //
      expect(() => new StringVerifier(null, instance(errorManager)).containsAny(...expected)).toThrow(ShouldError);
    });

    it("not contains throws", () => {
      const expected = Forger.create<string[]>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsAny(...expected)).toThrow(ShouldError);
    });

    it("contains success", () => {
      const expected = Forger.create<string[]>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected[0]).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsAny(...expected)).not.toThrow();
    });
  })

  describe('containsAnyIgnoreCase', () => {

    it("entry undefined throws", () => {
      const expected = Forger.create<string[]>()!;
      //
      expect(() => new StringVerifier(undefined, instance(errorManager)).containsAnyIgnoreCase(...expected)).toThrow(ShouldError);
    });

    it("entry null throws", () => {
      const expected = Forger.create<string[]>()!;
      //
      expect(() => new StringVerifier(null, instance(errorManager)).containsAnyIgnoreCase(...expected)).toThrow(ShouldError);
    });

    it("not contains throws", () => {
      const expected = Forger.create<string[]>()!;
      const entry = Forger.create<string>()!;
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsAnyIgnoreCase(...expected)).toThrow(ShouldError);
    });

    it("contains success", () => {
      const expected = Forger.create<string[]>()!;
      const entry = Forger.create<string>()! + new Array(1).fill(expected[0]).join('');
      //
      expect(() => new StringVerifier(entry, instance(errorManager)).containsAnyIgnoreCase(...expected)).not.toThrow();
    });
  })
})
