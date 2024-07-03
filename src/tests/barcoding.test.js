import { data, output } from "./dataSets";
import { generateKeys, encodeData } from "./../index";
const { keys, encodedData } = output;

describe("Encoding", () => {
  test("should get correct keys", () => {
    // compare object
    expect(generateKeys(data)).toEqual(keys);
  });
  test("should encode to a barcode", () => {
    const encodedData = encodeData(data);
    console.log(encodedData);
  });
});
