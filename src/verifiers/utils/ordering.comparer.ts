export class OrderingComparer {
  public static general<T>(f: T, s: T, dir: 'asc' | 'desc' = 'asc'): boolean {
    if (f === s) return true;
    if (f > s) return dir === 'desc';
    return dir === 'asc';
  }
}
