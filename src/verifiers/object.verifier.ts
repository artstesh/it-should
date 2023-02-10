import { AbstractVerifier } from './abstract.verifier';

export class ObjectVerifier<T> extends AbstractVerifier {
  private _ignore = new Set<string>();
  private _compareOnly = new Set<string>();
  private _rules: { [prop: string]: (o1: any, o2: any) => boolean } = {};

  constructor(private entry: T | null | undefined) {
    super();
    if (typeof entry !== 'object') throw new Error('entry is not a class or interface.');
  }

  equals = (expected: T): ObjectVerifier<T> =>
    this.manage(this.compareKeys(this.entry, expected), `${this.entry} doesn't equal ${expected}.`);

  rule<K extends keyof T>(prop: K, checker: (o1: T[K], o2: T[K]) => boolean): ObjectVerifier<T> {
    this._rules[prop + ''] = checker;
    return this;
  }

  ignoring<K extends keyof T>(prop: K): ObjectVerifier<T> {
    this._ignore.add(prop + '');
    return this;
  }

  compareOnly<K extends keyof T>(prop: K): ObjectVerifier<T> {
    this._compareOnly.add(prop + '');
    return this;
  }

  private compareKeys<P>(obj1: P | null | undefined, obj2: P | null | undefined, level = 0): boolean {
    if (!obj1 || !obj2) return false;
    this.getProps(obj1)
      .filter((p) => !this._ignore.has(p))
      .forEach((p) => {
        const prop1: any = (obj1 as any)[p];
        const prop2: any = (obj2 as any)[p];
        if (!level && this._rules[p])
          this.manage(this._rules[p](prop1, prop2), `Objects failed custom rule for ${prop1}.`);
        else if (prop1 instanceof Date)
          this.manage(
            prop1.toString() === prop2.toString(),
            `Objects have different ${p}: ${prop1.toString()} & ${prop2.toString()}.`,
          );
        else if (typeof prop1 === 'object') this.compareKeys(prop1, prop2, ++level);
        else this.manage(prop1 === prop2, `Objects have different ${p}: ${prop1} & ${prop2}.`);
      });
    return true;
  }

  private getProps<P>(obj: P) {
    let result = Object.keys(obj).filter(k => typeof (obj as any)[k] !== 'function');
    if (!!this._compareOnly.size) result = result.filter((p) => this._compareOnly.has(p));
    else if (!!this._ignore.size) result = result.filter((p) => this._ignore.has(p));
    return result;
  }
}
