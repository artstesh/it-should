import { SingleParamFunc } from './verify.func';

export class Times {
  static exactly =
    (expected: number): SingleParamFunc<number> =>
    (times: number): boolean =>
      expected === times;
  static once = (): SingleParamFunc<number> => Times.exactly(1);
  static twice = (): SingleParamFunc<number> => Times.exactly(2);
  static moreThan =
    (expected: number): SingleParamFunc<number> =>
    (times: number): boolean =>
      expected < times;
  static lessThan =
    (expected: number): SingleParamFunc<number> =>
    (times: number): boolean =>
      expected > times;
}
