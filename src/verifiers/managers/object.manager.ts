import { ShouldError } from '../../models/should.error';
import { ObjectsError } from '../../errors/objects.error';

export class ObjectManager<T extends {}> {
  private readonly entry: T;
  private props = new Set<string>();
  private ignoring = new Set<string>();
  private mapping: { [name: string]: string } = {};

  private get _filteredProps(): Set<keyof T> {
    const result = new Set<keyof T>();
    this.props.forEach((pp) => !this.ignoring.has(pp) && result.add(pp as keyof T));
    return result;
  }

  constructor(entry: T, protected errorManager: ObjectsError) {
    if (!entry) throw new ShouldError(this.errorManager.defined());
    if (typeof entry !== 'object') throw new ShouldError(`Illegal try to compare '${typeof entry}' as object.`);
    this.entry = entry;
    this.defineProps();
  }

  /**
   * Defines exclusive properties for the object comparing.
   * @param params The names of a properties
   */
  compareOnly(...params: string[]): void {
    this.props.forEach((p) => !params.find((pr) => pr === p) && this.props.delete(p));
  }

  /**
   * Excludes properties from the object comparing.
   * @param params The names of a properties
   */
  ignore(...params: string[]): void {
    params.forEach((p) => this.ignoring.add(p));
  }

  /**
   * Define other name for a prop
   * @param name1 The original name
   * @param name2 The new one
   */
  map(name1: string, name2: string): void {
    this.mapping[name1] = name2;
  }

  public countProperties(): number {
    return this._filteredProps.size;
  }

  public getProperties(): Set<keyof T> {
    return this._filteredProps;
  }

  public getValue(name: string): any {
    return this.entry[(this.mapping[name] ?? name) as keyof T];
  }

  private defineProps(): void {
    Object.keys(this.entry as any)
      .filter((k) => typeof (this.entry as any)[k] !== 'function')
      .forEach((k) => this.props.add(k));
  }
}
