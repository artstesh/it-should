export interface ObjectMapRule<T,P> {
  name1: keyof T;
  name2: keyof P;
  checker?: <K extends keyof T, L extends keyof P>(o1: any, o2: any) => boolean;
}
