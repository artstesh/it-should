import { Forger } from "@artstesh/forger";
import { should } from "../src";

describe("isolated", () => {
  it("success asc", () => {
    let entry: string[] = Forger.create<string[]>({ arrayLength: 10 })!;
    //
    should().array(entry).not.ordered();
  });
});
