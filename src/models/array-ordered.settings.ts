export class ArrayOrderedSettings<T> {
  /**
   * The expected direction of the ordering.
   * default is 'asc'
   */
  dir?: 'asc' | 'desc';
  /**
   * A function that gets a comparable value from an array's item
   * default is x => x
   */
  by?: (e?: T | null) => any;

  constructor() {
    this.by = (x) => x;
    this.dir = 'asc';
  }

  public static fix<T>(model?: ArrayOrderedSettings<T>): ArrayOrderedSettings<T>{
    const result = new ArrayOrderedSettings<T>();
    if (model?.by) result.by = model.by;
    if (model?.dir) result.dir = model.dir;
    return result;
  }
}
