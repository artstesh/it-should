import { AbstractVerifier } from './abstract.verifier';

/**
 * An inspector responsible for comparison of objects
 */
export class ObjectsVerifier<T, P> extends AbstractVerifier {
  private _ignore = new Set<keyof T>();
  private _compareOnly = new Set<keyof T>();
  private _rules: { [prop: string]: (o1: any, o2: any) => boolean } = {};
  private _mapping: [keyof T, keyof P][] = [];

  constructor(private entry: T | null | undefined, private other: P | null | undefined) {
    super();
  }

  equal(): ObjectsVerifier<T, P> {
    return this.manage(this.compareKeys(this.entry, this.other), `Objects don't equal.`);
  }

  rule<K extends keyof T>(prop: K, checker: (o1: T[K], o2: T[K]) => boolean): ObjectsVerifier<T, P> {
    this._rules[prop + ''] = checker;
    return this;
  }

  map<K extends keyof T, L extends keyof P>(name1: keyof T, name2: keyof P): ObjectsVerifier<T, P> {
    this._mapping.push([name1, name2]);
    return this;
  }

  ignoring<K extends keyof T>(...params: K[]): ObjectsVerifier<T, P> {
    params.forEach((p) => this._ignore.add(p));
    return this;
  }

  compareOnly<K extends keyof T>(...params: K[]): ObjectsVerifier<T, P> {
    params.forEach((p) => this._compareOnly.add(p));
    return this;
  }

  private compareKeys<Z, R>(obj1: Z | null | undefined, obj2: R | null | undefined, level = 0): boolean {
    this.manage(!!obj1, 'The first object is not defined.', !obj1);
    this.manage(!!obj2, 'The first object is not defined.', !obj2);
    this.getProps(obj1, level).forEach((p) => {
      const prop1: any = (obj1 as any)[p];
      const prop2: any = (obj2 as any)[this._mapping.find((m) => m[0] === p)?.[1] ?? p];
      if (!level && this._rules[p])
        this.manage(this._rules[p](prop1, prop2), `Objects failed custom rule for '${prop1}'.`);
      else if (prop1 instanceof Date)
        this.manage(
          prop1?.toString() === prop2?.toString(),
          `Objects have different '${p}': ${prop1.toString()} & ${prop2.toString()}.`,
        );
      else if (typeof prop1 === 'object') this.compareKeys(prop1, prop2, ++level);
      else this.manage(prop1 === prop2, `Objects have different '${p}': ${prop1} & ${prop2}.`);
    });
    return true;
  }

  private getProps<Z>(obj: Z, level = 0) {
    let result = Object.keys(obj).filter((k) => typeof (obj as any)[k] !== 'function');
    if (!!this._compareOnly.size && !level) result = result.filter((p) => this._compareOnly.has(p as any));
    else if (!!this._ignore.size && !level) result = result.filter((p) => !this._ignore.has(p as any));
    return result;
  }
}
