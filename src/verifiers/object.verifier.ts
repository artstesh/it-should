import { AbstractVerifier } from "./abstract.verifier";

export class ObjectVerifier extends AbstractVerifier {
  constructor(private entry: object | null | undefined) {
    super();
    if (typeof entry !== 'object') throw new Error('entry is not a class or interface.');
  }

  equals = (expected: object): ObjectVerifier =>
    this.manage(this.compareKeys(this.entry, expected) && this.entry === expected, `${this.entry} doesn't equal ${expected}.`);

  private compareKeys(obj1: object | null | undefined, obj2: object | null | undefined): boolean {
    if (!obj1 || !obj2 || typeof obj2 !== 'object') return false;
    const props1 = Object.keys(obj1);
    const props2 = Object.keys(obj2);
    this.manage(props1.length === props2.length, `Objects have different number of properties.`);
    props1.forEach(p => {
      const prop1: any = (obj1 as any)[p];
      const prop2: any = (obj2 as any)[p];
      console.log(prop1, typeof prop1, prop2, typeof prop2)
      if (prop1 instanceof Date)
        this.manage(prop1.toString() === prop2.toString(), `Objects have different ${p}: ${prop1.toString()} & ${prop2.toString()}.`);
      else if (typeof prop1 === 'object') this.compareKeys(prop1, prop2);
      else
        this.manage(prop1 === prop2, `Objects have different ${p}: ${prop1} & ${prop2}.`);
    })
    return true
  }
}
