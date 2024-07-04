import { data as input, encodedData as output } from "./dataSets";
import { encodeData } from "../src/encode/encodeData";
import { generateKeys } from "../src/encode/generateKeys";
import filterAndSortEncodedData from "../src/encodedDataHandler/filterAndSortEncodedData";
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

describe("Filtering and Sorting", () => {
  test("should return same data without sorting and filtering", () => {
    const filteredData = filterAndSortEncodedData(output, "", "", {});
    // compare object
    expect(filteredData).toEqual(output);
  });
  test("should return error if sort element is not in keys", () => {
    expect(() =>
      filterAndSortEncodedData(output, "notInKeys", "", {})
    ).toThrow();
  });
  test("should return error if filter element is not in keys", () => {
    expect(() =>
      filterAndSortEncodedData(output, "", "", {
        notInKeys: { includes: [], excludes: [] },
      })
    ).toThrow();
  });
  test("should filter data", () => {
    const filteredData = filterAndSortEncodedData(output, "", "", {
      engravings: { includes: ["버스트"] },
    });
    // compare object
    expect(filteredData).toEqual({
      keys: outputKeys,
      enData: [outputEnData[0]],
    });
  });
  test("should filter data", () => {
    const filteredData = filterAndSortEncodedData(output, "", "", {
      engravings: { excludes: ["버스트"] },
    });
    // compare object
    expect(filteredData).toEqual({
      keys: outputKeys,
      enData: [outputEnData[1]],
    });
  });
});

describe("Decoding", () => {
  test("should decode to a barcode", () => {
    // const decodedData = decodeData(encodedData);
    // console.log(JSON.stringify(decodedData));
  });
});
