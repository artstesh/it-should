import { ObjectManager } from './managers/object.manager';
import { ObjectsError } from '../errors/objects.error';
import { GeneralVerifier } from './general.verifier';

/**
 * An inspector responsible for comparison of objects
 */
export class ObjectsVerifier<T, P> extends GeneralVerifier<T | null | undefined> {
  private _rules: { [prop: string]: (o1: any, o2: any) => boolean } = {};
  private readonly entryManager: ObjectManager<T>;
  private readonly otherManager: ObjectManager<P>;

  constructor(protected entry: T, private other: P, protected errorManager: ObjectsError) {
    super(entry);
    this.entryManager = new ObjectManager(entry, errorManager);
    this.otherManager = new ObjectManager(other, errorManager);
  }

  /**
   * Checking that the objects are equal
   * @throws {@link ShouldError} if any of objects is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if objects are different accordingly to the defined rules.
   */
  equal(): ObjectsVerifier<T, P> {
    this.checkDefined();
    const error = this.compareKeys(this.entryManager, this.otherManager);
    if (this.notIsActivated) return this.manage(!error, (d) => this.errorManager.equal(d));
    return this.manage(!error, () => error);
  }

  /**
   * The method defines a rule for comparing a common property of the objects
   * @param prop A name of a property
   * @param checker A function that defines a way of comparing of the properties
   */
  rule<K extends keyof T>(prop: K, checker: (o1: T[K], o2: T[K]) => boolean): ObjectsVerifier<T, P> {
    this._rules[prop + ''] = checker;
    return this;
  }

  /**
   * The method defines a rule that orders to compare different properties of the objects
   * @param name1 The name of the property of the first object
   * @param name2 The name of the property of the second object
   */
  map<K extends keyof T, L extends keyof P>(name1: keyof T, name2: keyof P): ObjectsVerifier<T, P> {
    this.otherManager.map(name1 + '', name2 + '');
    return this;
  }

  /**
   * Allows to exclude some properties from the comparing process.
   * @param params The names of a properties
   */
  ignoring(...params: (keyof T | keyof P)[]): ObjectsVerifier<T, P> {
    this.entryManager.ignore(...params.map((p) => p + ''));
    this.otherManager.ignore(...params.map((p) => p + ''));
    return this;
  }

  /**
   * Allows to define exclusive collection of properties that should be checked under the comparing process.
   * The method overrides any settings that were set by 'ignoring' method.
   * @param params The names of a properties
   */
  compareOnly<K extends keyof T>(...params: (keyof T | keyof P)[]): ObjectsVerifier<T, P> {
    this.entryManager.compareOnly(...params.map((p) => p + ''));
    this.otherManager.compareOnly(...params.map((p) => p + ''));
    return this;
  }

  private compareKeys<Z, R>(obj1: ObjectManager<Z>, obj2: ObjectManager<R>): string {
    let result = '';
    const props = obj1.getProperties();
    const sameCount = props.size === obj2.countProperties();
    if (!sameCount) return this.errorManager.countProperties();
    props.forEach((p) => {
      if (!!result) return;
      const val1 = obj1.getValue(p + '');
      const val2 = obj2.getValue(p + '');
      if (!!this._rules?.[p + '']) {
        if (!this._rules[p + ''](val1, val2)) result = this.errorManager.customRule(p + '');
      } else if (val1 instanceof Date) {
        if (val1?.toString() !== val2?.toString()) result = this.errorManager.differentVals(p + '', val1, val2);
      } else if (typeof val1 === 'object')
        result = this.compareKeys(
          new ObjectManager(val1, this.errorManager),
          new ObjectManager(val2, this.errorManager),
        );
      else if (val1 !== val2) result = this.errorManager.differentVals(p + '', val1, val2);
    });
    return result;
  }
}
