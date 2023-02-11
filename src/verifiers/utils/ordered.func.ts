export type OrderingFunction = <T>(f: T, s: T, dir: 'asc' | 'desc') => boolean;
export type ObjectOrderingFunction = <T, K extends keyof T>(prop: K, f: T, s: T, dir: 'asc' | 'desc') => boolean;
