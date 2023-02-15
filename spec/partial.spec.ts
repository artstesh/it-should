import { Forger } from "@artstesh/forger";
import { ArrayVerifier } from "../src";
import { ShouldError } from "../src/models/should.error";

describe("isolated", () => {
  it("success asc", () => {
    let entry: string[] = Forger.create<string[]>({arrayLength: 10})!;
    //
    expect(() => new ArrayVerifier(entry).ordered({dir: 'desc'})).toThrow(ShouldError);
  });
});
