import { data, output } from "./dataSets";
import { generateKeys } from "./../index";
const { keys, encodedData } = output;

describe("Encoding", () => {
  test("should get correct keys", () => {
    // compare object
    expect(generateKeys(data)).toEqual(keys);
  });
  test("should encode to a barcode", () => {
    console.log(data);
  });
});
