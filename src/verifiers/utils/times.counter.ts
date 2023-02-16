import { SingleParamFunc } from './verify.func';

/**
 * Provides counting processors for inspectors
 */
export class Times {
  /**
   * Makes sure that something happens the defined number of times
   * @param expected The expected number of repetitions
   */
  static exactly =
    (expected: number): SingleParamFunc<number> =>
    (times: number): boolean =>
      expected === times;
  /**
   * Makes sure that something happens only once
   */
  static once = (): SingleParamFunc<number> => Times.exactly(1);
  /**
   * Makes sure that something happens only twice
   */
  static twice = (): SingleParamFunc<number> => Times.exactly(2);
  /**
   * Makes sure that something happens more than defined number of times
   * @param expected The bottom border of repetitions(exclusively)
   */
  static moreThan =
    (expected: number): SingleParamFunc<number> =>
    (times: number): boolean =>
      expected < times;
  /**
   * Makes sure that something happens less than defined number of times
   * @param expected The top border of repetitions(exclusively)
   */
  static lessThan =
    (expected: number): SingleParamFunc<number> =>
    (times: number): boolean =>
      expected > times;
}
