import { data as input, encodedData as output } from "./dataSets";
import { generateKeys, encodeData } from "../src/index";
const { keys: outputKeys, enData: outputEnData } = output;

describe("Encoding", () => {
  test("should get correct keys", () => {
    // compare object
    expect(generateKeys(input)).toEqual(outputKeys);
  });
  test("should encode to a barcode", () => {
    const encodedData = encodeData(input);
    // compare object
    expect(encodedData).toEqual(output);
  });
});

describe("Decoding", () => {
  test("should decode to a barcode", () => {
    // const decodedData = decodeData(encodedData);
    // console.log(JSON.stringify(decodedData));
  });
});
