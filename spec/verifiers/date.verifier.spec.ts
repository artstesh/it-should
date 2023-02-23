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

        it('success month deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          //
          expect(() => new DateVerifier(entry).not.equals(expected, 'month')).toThrow(ShouldError);
        })

        it('success year deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMonth(0);
          expected.setMonth(Forger.create<number>({numberMin: 1, numberMax: 11})!);
          //
          expect(() => new DateVerifier(entry).not.equals(expected, 'year')).toThrow(ShouldError);
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

        it('success month deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString(), 'month')).toThrow(ShouldError);
        })

        it('success year deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMonth(0);
          expected.setMonth(Forger.create<number>({numberMin: 1, numberMax: 11})!);
          //
          expect(() => new DateVerifier(entry.toString()).not.equals(expected.toString(), 'year')).toThrow(ShouldError);
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

  describe('before', () => {
    describe('Date', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry).before(expected)).not.toThrow();
        })

        it('not before throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry).before(expected)).toThrow(ShouldError);
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).before(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).before(expected)).toThrow(ShouldError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry).not.before(expected)).toThrow(ShouldError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry).not.before(expected)).not.toThrow();
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).not.before(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).not.before(expected)).toThrow(ShouldError);
        })
      })
    })

    describe('string', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry.toString()).before(expected.toString())).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry.toString()).before(expected.toString())).toThrow(ShouldError);
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).before(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).before(expected)).toThrow(ShouldError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry.toString()).not.before(expected.toString())).toThrow(ShouldError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry.toString()).not.before(expected.toString())).not.toThrow();
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).not.before(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).not.before(expected)).toThrow(ShouldError);
        })
      })
    })
  })

  describe('after', () => {
    describe('Date', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry).after(expected)).not.toThrow();
        })

        it('not after throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry).after(expected)).toThrow(ShouldError);
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).after(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).after(expected)).toThrow(ShouldError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry).not.after(expected)).toThrow(ShouldError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry).not.after(expected)).not.toThrow();
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).not.after(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).not.after(expected)).toThrow(ShouldError);
        })
      })
    })

    describe('string', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry.toString()).after(expected.toString())).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry.toString()).after(expected.toString())).toThrow(ShouldError);
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).after(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).after(expected)).toThrow(ShouldError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry.toString()).not.after(expected.toString())).toThrow(ShouldError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry.toString()).not.after(expected.toString())).not.toThrow();
        })

        it('undefined throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined).not.after(expected)).toThrow(ShouldError);
        })

        it('null throws', () => {
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null).not.after(expected)).toThrow(ShouldError);
        })
      })
    })
  })

  describe('inRange', () => {
    let dateMin: Date;
    let dateMax: Date;

    beforeEach(() => {
      dateMin = Forger.create<Date>({dateMax: new Date(1900,0,1)})!;
      dateMax = Forger.create<Date>({dateMin: new Date(2000,0,1)})!;
    })

    describe('Date', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>({dateMax, dateMin})!;
          //
          expect(() => new DateVerifier(entry).inRange(dateMin, dateMax)).not.toThrow();
        })

        it('not inRange throws', () => {
          const entry = Forger.create<Date>({dateMin: dateMax})!;
          //
          expect(() => new DateVerifier(entry).inRange(dateMin, dateMax)).toThrow(ShouldError);
        })

        it('undefined throws', () => {
          expect(() => new DateVerifier(undefined).inRange(dateMin, dateMax)).toThrow(ShouldError);
        })

        it('null throws', () => {
          expect(() => new DateVerifier(null).inRange(dateMin, dateMax)).toThrow(ShouldError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>({dateMax, dateMin})!;
          //
          expect(() => new DateVerifier(entry).not.inRange(dateMin, dateMax)).toThrow(ShouldError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>({dateMin: dateMax})!;
          //
          expect(() => new DateVerifier(entry).not.inRange(dateMin, dateMax)).not.toThrow();
        })

        it('undefined throws', () => {
          expect(() => new DateVerifier(undefined).not.inRange(dateMin, dateMax)).toThrow(ShouldError);
        })

        it('null throws', () => {
          expect(() => new DateVerifier(null).not.inRange(dateMin, dateMax)).toThrow(ShouldError);
        })
      })
    })

    describe('string', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>({dateMax, dateMin})!;
          //
          expect(() => new DateVerifier(entry.toString()).inRange(dateMin.toString(), dateMax.toString())).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>({dateMin: dateMax})!;
          //
          expect(() => new DateVerifier(entry.toString()).inRange(dateMin.toString(), dateMax.toString())).toThrow(ShouldError);
        })

        it('undefined throws', () => {
          expect(() => new DateVerifier(undefined).inRange(dateMin, dateMax)).toThrow(ShouldError);
        })

        it('null throws', () => {
          expect(() => new DateVerifier(null).inRange(dateMin, dateMax)).toThrow(ShouldError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>({dateMax, dateMin})!;
          //
          expect(() => new DateVerifier(entry.toString()).not.inRange(dateMin.toString(), dateMax.toString())).toThrow(ShouldError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>({dateMin: dateMax})!;
          //
          expect(() => new DateVerifier(entry.toString()).not.inRange(dateMin.toString(), dateMax.toString())).not.toThrow();
        })

        it('undefined throws', () => {
          expect(() => new DateVerifier(undefined).not.inRange(dateMin, dateMax)).toThrow(ShouldError);
        })

        it('null throws', () => {
          expect(() => new DateVerifier(null).not.inRange(dateMin, dateMax)).toThrow(ShouldError);
        })
      })
    })
  })
})
