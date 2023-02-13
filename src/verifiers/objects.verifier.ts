import { AbstractVerifier } from "./abstract.verifier";
import { ObjectManager } from "./managers/object.manager";

/**
 * An inspector responsible for comparison of objects
 */
export class ObjectsVerifier<T, P> extends AbstractVerifier {
  private _rules: { [prop: string]: (o1: any, o2: any) => boolean } = {};
  private readonly entryManager: ObjectManager<T>;
  private readonly otherManager: ObjectManager<P>;

  constructor(private entry: T, private other: P) {
    super();
    this.entryManager = new ObjectManager(entry);
    this.otherManager = new ObjectManager(other);
  }

  /**
   * Checking that the objects are equal
   * @throws {@link ShouldError} if any of objects is not defined regardless the presence/absence of not() function.
   * @throws {@link ShouldError} if objects are different accordingly to the defined rules.
   */
  equal(): ObjectsVerifier<T, P> {
    return this.manage(this.compareKeys(this.entryManager, this.otherManager), `Objects don't equal.`);
  }

  /**
   * The method defines a rule for comparing a common property of the objects
   * @param prop A name of a property
   * @param checker A function that defines a way of comparing of the properties
   */
  rule<K extends keyof T>(prop: K, checker: (o1: T[K], o2: T[K]) => boolean): ObjectsVerifier<T, P> {
    this._rules[prop + ""] = checker;
    return this;
  }

  /**
   * The method defines a rule that orders to compare different properties of the objects
   * @param name1 The name of the property of the first object
   * @param name2 The name of the property of the second object
   */
  map<K extends keyof T, L extends keyof P>(name1: keyof T, name2: keyof P): ObjectsVerifier<T, P> {
    this.otherManager.map( name1+'',name2+'');
    return this;
  }

  /**
   * Allows to exclude some properties from the comparing process.
   * @param params The names of a properties
   */
  ignoring(...params: (keyof T | keyof P)[]): ObjectsVerifier<T, P> {
    this.entryManager.ignore(...params.map(p => p+''));
    this.otherManager.ignore(...params.map(p => p+''));
    return this;
  }

  /**
   * Allows to define exclusive collection of properties that should be checked under the comparing process.
   * The method overrides any settings that were set by 'ignoring' method.
   * @param params The names of a properties
   */
  compareOnly<K extends keyof T>(...params: (keyof T | keyof P)[]): ObjectsVerifier<T, P> {
    this.entryManager.compareOnly(...params.map(p => p+''));
    this.otherManager.compareOnly(...params.map(p => p+''));
    return this;
  }

  private compareKeys<Z, R>(obj1: ObjectManager<Z>, obj2: ObjectManager<R>): boolean {
    const props = obj1.getProperties();
    this.manage(props.size === obj2.countProperties(),
      'The objects has diffent number of properties.');
    props.forEach(p => {
      const val1 = obj1.getValue(p+'');
      const val2 = obj2.getValue(p+'');
      if (!!this._rules[p+''])
        this.manage(this._rules[p+''](val1, val2), `Objects failed custom rule for '${p}'.`);
      else if (val1 instanceof Date)
        this.manage(val1?.toString() === val2?.toString(),
          `Objects have different '${p}': ${val1?.toString()} & ${val2?.toString()}.`
        );
      else if (typeof val1 === "object") this.compareKeys(new ObjectManager(val1), new ObjectManager(val2));
      else this.manage(val1 === val2, `Objects have different '${p}': ${val1} & ${val2}.`);
    })
    return true;
  }
}
