import { Forger } from "@artstesh/forger";
import { should } from "../src";

describe("isolated", () => {
  it("success asc", () => {
    interface Student {name: string, age: number}
    let entry: Student[] = Forger.create<Student[]>({ arrayLength: 10 })!;
    //
    should().array(entry).not.ordered();
  });
});
