import { Forger } from "@artstesh/forger";
import { ShouldError } from "../../src/models/should.error";
import { DateVerifier } from "../../src";
import { anything, instance, mock, reset, when } from "ts-mockito";
import { DateError } from "../../src/errors/date.error";

describe('DateVerifier', () => {
  const errorManager = mock(DateError);
  let expectedError: ShouldError;
  let errorMessage: string;

  beforeEach(() => {
    errorMessage = Forger.create<string>()!;
    expectedError = new ShouldError(errorMessage);
  })

  afterEach(() => {
    reset(errorManager);
  })

  describe('equals', () => {
    describe('Date', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).equals(expected)).not.toThrow();
        })

        it('success second deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMilliseconds(0);
          expected.setMilliseconds(Forger.create<number>({numberMin: 1, numberMax: 999})!);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).equals(expected, 'second')).not.toThrow();
        })

        it('success minute deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setSeconds(0);
          expected.setSeconds(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).equals(expected, 'minute')).not.toThrow();
        })

        it('success hour deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMinutes(0);
          expected.setMinutes(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).equals(expected, 'hour')).not.toThrow();
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setHours(0);
          expected.setHours(Forger.create<number>({numberMin: 1, numberMax: 23})!);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).equals(expected, 'day')).not.toThrow();
        })

        it('success month deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).equals(expected, 'month')).not.toThrow();
        })

        it('success year deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMonth(0);
          expected.setMonth(Forger.create<number>({numberMin: 1, numberMax: 11})!);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).equals(expected, 'year')).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>()!;
          when(errorManager.equals(expected,entry,true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).equals(expected)).toThrow(expectedError);
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).equals(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).equals(expected)).toThrow(expectedError);
        })
      })
      describe('not', () => {
        it('equals throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          when(errorManager.equals(expected,entry,false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.equals(expected)).toThrow(expectedError);
        })

        it('success second deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMilliseconds(0);
          expected.setMilliseconds(Forger.create<number>({numberMin: 1, numberMax: 999})!);
          when(errorManager.equals(expected,entry,false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.equals(expected, 'second')).toThrow(expectedError);
        })

        it('success minute deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setSeconds(0);
          expected.setSeconds(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          when(errorManager.equals(expected,entry,false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.equals(expected, 'minute')).toThrow(expectedError);
        })

        it('success hour deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMinutes(0);
          expected.setMinutes(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          when(errorManager.equals(expected,entry,false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.equals(expected, 'hour')).toThrow(expectedError);
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setHours(0);
          expected.setHours(Forger.create<number>({numberMin: 1, numberMax: 23})!);
          when(errorManager.equals(expected,entry,false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.equals(expected, 'day')).toThrow(expectedError);
        })

        it('success month deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          when(errorManager.equals(expected,entry,false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.equals(expected, 'month')).toThrow(expectedError);
        })

        it('success year deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMonth(0);
          expected.setMonth(Forger.create<number>({numberMin: 1, numberMax: 11})!);
          when(errorManager.equals(expected,entry,false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.equals(expected, 'year')).toThrow(expectedError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.equals(expected)).not.toThrow();
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).not.equals(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).not.equals(expected)).toThrow(expectedError);
        })
      })
    })

    describe('string', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).equals(expected.toString())).not.toThrow();
        })

        it('success second deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMilliseconds(0);
          expected.setMilliseconds(Forger.create<number>({numberMin: 1, numberMax: 999})!);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).equals(expected.toString(), 'second')).not.toThrow();
        })

        it('success minute deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setSeconds(0);
          expected.setSeconds(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).equals(expected.toString(), 'minute')).not.toThrow();
        })

        it('success hour deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMinutes(0);
          expected.setMinutes(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).equals(expected.toString(), 'hour')).not.toThrow();
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setHours(0);
          expected.setHours(Forger.create<number>({numberMin: 1, numberMax: 23})!);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).equals(expected.toString(), 'day')).not.toThrow();
        })

        it('success month deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).equals(expected.toString(), 'month')).not.toThrow();
        })

        it('success year deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMonth(0);
          expected.setMonth(Forger.create<number>({numberMin: 1, numberMax: 11})!);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).equals(expected.toString(), 'year')).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>()!;
          when(errorManager.equals(anything(),anything(),true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).equals(expected.toString())).toThrow(expectedError);
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).equals(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).equals(expected)).toThrow(expectedError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          when(errorManager.equals(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.equals(expected.toString())).toThrow(expectedError);
        })

        it('success second deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMilliseconds(0);
          expected.setMilliseconds(Forger.create<number>({numberMin: 1, numberMax: 999})!);
          when(errorManager.equals(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.equals(expected.toString(), 'second')).toThrow(expectedError);
        })

        it('success minute deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setSeconds(0);
          expected.setSeconds(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          when(errorManager.equals(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.equals(expected.toString(), 'minute')).toThrow(expectedError);
        })

        it('success hour deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMinutes(0);
          expected.setMinutes(Forger.create<number>({numberMin: 1, numberMax: 59})!);
          when(errorManager.equals(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.equals(expected.toString(), 'hour')).toThrow(expectedError);
        })

        it('success day deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setHours(0);
          expected.setHours(Forger.create<number>({numberMin: 1, numberMax: 23})!);
          when(errorManager.equals(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.equals(expected.toString(), 'day')).toThrow(expectedError);
        })

        it('success month deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setDate(1);
          expected.setDate(Forger.create<number>({numberMin: 2, numberMax: 28})!);
          when(errorManager.equals(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.equals(expected.toString(), 'month')).toThrow(expectedError);
        })

        it('success year deviation', () => {
          const entry = Forger.create<Date>()!;
          const expected = new Date(entry);
          entry.setMonth(0);
          expected.setMonth(Forger.create<number>({numberMin: 1, numberMax: 11})!);
          when(errorManager.equals(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.equals(expected.toString(), 'year')).toThrow(expectedError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.equals(expected.toString())).not.toThrow();
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).not.equals(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).not.equals(expected)).toThrow(expectedError);
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
          expect(() => new DateVerifier(entry, instance(errorManager)).before(expected)).not.toThrow();
        })

        it('not before throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          when(errorManager.before(anything(),anything(),true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).before(expected)).toThrow(expectedError);
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).before(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).before(expected)).toThrow(expectedError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          when(errorManager.before(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.before(expected)).toThrow(expectedError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.before(expected)).not.toThrow();
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).not.before(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).not.before(expected)).toThrow(expectedError);
        })
      })
    })

    describe('string', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).before(expected.toString())).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          when(errorManager.before(anything(),anything(),true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).before(expected.toString())).toThrow(expectedError);
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).before(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).before(expected)).toThrow(expectedError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          when(errorManager.before(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.before(expected.toString())).toThrow(expectedError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.before(expected.toString())).not.toThrow();
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).not.before(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).not.before(expected)).toThrow(expectedError);
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
          expect(() => new DateVerifier(entry, instance(errorManager)).after(expected)).not.toThrow();
        })

        it('not after throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          when(errorManager.after(anything(),anything(),true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).after(expected)).toThrow(expectedError);
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).after(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).after(expected)).toThrow(expectedError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          when(errorManager.after(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.after(expected)).toThrow(expectedError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.after(expected)).not.toThrow();
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).not.after(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).not.after(expected)).toThrow(expectedError);
        })
      })
    })

    describe('string', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).after(expected.toString())).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          when(errorManager.after(anything(),anything(),true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).after(expected.toString())).toThrow(expectedError);
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).after(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).after(expected)).toThrow(expectedError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMax: entry})!;
          when(errorManager.after(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.after(expected.toString())).toThrow(expectedError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>()!;
          const expected = Forger.create<Date>({dateMin: entry})!;
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.after(expected.toString())).not.toThrow();
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).not.after(expected)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          const expected = Forger.create<Date>()!;
          //
          expect(() => new DateVerifier(null, instance(errorManager)).not.after(expected)).toThrow(expectedError);
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
          expect(() => new DateVerifier(entry, instance(errorManager)).inRange(dateMin, dateMax)).not.toThrow();
        })

        it('not inRange throws', () => {
          const entry = Forger.create<Date>({dateMin: dateMax})!;
          when(errorManager.before(anything(),anything(),true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).inRange(dateMin, dateMax)).toThrow(expectedError);
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).inRange(dateMin, dateMax)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(null, instance(errorManager)).inRange(dateMin, dateMax)).toThrow(expectedError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>({dateMax, dateMin})!;
          when(errorManager.before(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.inRange(dateMin, dateMax)).toThrow(expectedError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>({dateMin: dateMax})!;
          //
          expect(() => new DateVerifier(entry, instance(errorManager)).not.inRange(dateMin, dateMax)).not.toThrow();
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).not.inRange(dateMin, dateMax)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(null, instance(errorManager)).not.inRange(dateMin, dateMax)).toThrow(expectedError);
        })
      })
    })

    describe('string', () => {
      describe('direct', () => {
        it('success', () => {
          const entry = Forger.create<Date>({dateMax, dateMin})!;
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).inRange(dateMin.toString(), dateMax.toString())).not.toThrow();
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>({dateMin: dateMax})!;
          when(errorManager.before(anything(),anything(),true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).inRange(dateMin.toString(), dateMax.toString())).toThrow(expectedError);
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).inRange(dateMin, dateMax)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(null, instance(errorManager)).inRange(dateMin, dateMax)).toThrow(expectedError);
        })
      })
      describe('not', () => {
        it('success', () => {
          const entry = Forger.create<Date>({dateMax, dateMin})!;
          when(errorManager.before(anything(),anything(),false)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.inRange(dateMin.toString(), dateMax.toString())).toThrow(expectedError);
        })

        it('not equal throws', () => {
          const entry = Forger.create<Date>({dateMin: dateMax})!;
          //
          expect(() => new DateVerifier(entry.toString(), instance(errorManager)).not.inRange(dateMin.toString(), dateMax.toString())).not.toThrow();
        })

        it('undefined throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(undefined, instance(errorManager)).not.inRange(dateMin, dateMax)).toThrow(expectedError);
        })

        it('null throws', () => {
          when(errorManager.defined(true)).thenReturn(errorMessage);
          //
          expect(() => new DateVerifier(null, instance(errorManager)).not.inRange(dateMin, dateMax)).toThrow(expectedError);
        })
      })
    })
  })
})
