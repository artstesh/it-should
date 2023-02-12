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
}
