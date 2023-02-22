import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { DateVerifier } from "../../src";

describe('DateVerifier', () => {

  describe('equals', () => {
    describe('Date', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          //
          expect(() => new DateVerifier(entry).equals(expected)).not.toThrow();
        })

        it('success second deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMilliseconds(0);
          expected.setMilliseconds(Forger.create<number>({numberMin: 1, numberMax: 999})!);
          //
          expect(() => new DateVerifier(entry).equals(expected, 'second')).not.toThrow();
        })

        it('success minute deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setSeconds(0);
          expected.setSeconds(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry).equals(expected, 'minute')).not.toThrow();
        })

        it('success hour deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMinutes(0);
          expected.setMinutes(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry).equals(expected, 'hour')).not.toThrow();
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setHours(0);
          expected.setHours(Forger.create<number>({numberMin: 1, numberMax: 23})!);
          //
          expect(() => new DateVerifier(entry).equals(expected, 'day')).not.toThrow();
        })

        it('success month deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          //
          expect(() => new DateVerifier(entry).equals(expected, 'month')).not.toThrow();
        })

        it('success year deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMonth(0);
          expected.setMonth(Forger.create<number>({numberMin: 1, numberMax: 11})!);
          //
          expect(() => new DateVerifier(entry).equals(expected, 'year')).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(entry).equals(expected)).toThrow(ShouldError);
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).equals(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).equals(expected)).toThrow(ShouldError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          //
          expect(() => new DateVerifier(entry).not.equals(expected)).toThrow(ShouldError);
        })

        it('success second deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMilliseconds(0);
          expected.setMilliseconds(Forger.create<number>({numberMin: 1, numberMax: 999})!);
          //
          expect(() => new DateVerifier(entry).not.equals(expected, 'second')).toThrow(ShouldError);
        })

        it('success minute deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setSeconds(0);
          expected.setSeconds(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry).not.equals(expected, 'minute')).toThrow(ShouldError);
        })

        it('success hour deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMinutes(0);
          expected.setMinutes(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry).not.equals(expected, 'hour')).toThrow(ShouldError);
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setHours(0);
          expected.setHours(Forger.create<number>({numberMin: 1, numberMax: 23})!);
          //
          expect(() => new DateVerifier(entry).not.equals(expected, 'day')).toThrow(ShouldError);
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          //
          expect(() => new DateVerifier(entry).not.equals(expected, 'month')).toThrow(ShouldError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(entry).not.equals(expected)).not.toThrow();
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).not.equals(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).not.equals(expected)).toThrow(ShouldError);
        })
      })
    })

    describe('string', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          //
          expect(() => new DateVerifier(entry.toString()).equals(expected.toString())).not.toThrow();
        })

        it('success second deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMilliseconds(0);
          expected.setMilliseconds(Forger.create<number>({numberMin: 1, numberMax: 999})!);
          //
          expect(() => new DateVerifier(entry.toString()).equals(expected.toString(), 'second')).not.toThrow();
        })

        it('success minute deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setSeconds(0);
          expected.setSeconds(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry.toString()).equals(expected.toString(), 'minute')).not.toThrow();
        })

        it('success hour deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMinutes(0);
          expected.setMinutes(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry.toString()).equals(expected.toString(), 'hour')).not.toThrow();
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setHours(0);
          expected.setHours(Forger.create<number>({numberMin: 1, numberMax: 23})!);
          //
          expect(() => new DateVerifier(entry.toString()).equals(expected.toString(), 'day')).not.toThrow();
        })

        it('success month deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          //
          expect(() => new DateVerifier(entry.toString()).equals(expected.toString(), 'month')).not.toThrow();
        })

        it('success year deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMonth(0);
          expected.setMonth(Forger.create<number>({numberMin: 1, numberMax: 11})!);
          //
          expect(() => new DateVerifier(entry.toString()).equals(expected.toString(), 'year')).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(entry.toString()).equals(expected.toString())).toThrow(ShouldError);
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).equals(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).equals(expected)).toThrow(ShouldError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString())).toThrow(ShouldError);
        })

        it('success second deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMilliseconds(0);
          expected.setMilliseconds(Forger.create<number>({numberMin: 1, numberMax: 999})!);
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString(), 'second')).toThrow(ShouldError);
        })

        it('success minute deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setSeconds(0);
          expected.setSeconds(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString(), 'minute')).toThrow(ShouldError);
        })

        it('success hour deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMinutes(0);
          expected.setMinutes(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString(), 'hour')).toThrow(ShouldError);
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setHours(0);
          expected.setHours(Forger.create<number>({numberMin: 1, numberMax: 23})!);
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString(), 'day')).toThrow(ShouldError);
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString(), 'month')).toThrow(ShouldError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString())).not.toThrow();
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).not.equals(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).not.equals(expected)).toThrow(ShouldError);
        })
      })
    })
  })
})
