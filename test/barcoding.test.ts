import { data as input, encodedData as output } from "./dataSets";
import { encodeData } from "../src/encode/encodeData";
import { generateKeys } from "../src/encode/generateKeys";
import filterAndSortEncodedData from "../src/encodedDataHandler/filterAndSortEncodedData";
const { keys: outputKeys, enData: outputEnData } = output;
import Barcoding from "../src/index";

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
    const filteredData = filterAndSortEncodedData(output, "", "", "desc", {});
    // compare object
    expect(filteredData).toEqual(output);
  });
  test("should return error if sort element is not in keys", () => {
    expect(() =>
      filterAndSortEncodedData(output, "notInKeys", "", "desc", {})
    ).toThrow();
  });
  test("should return error if filter element is not in keys", () => {
    expect(() =>
      filterAndSortEncodedData(output, "", "", "desc", {
        notInKeys: { includes: [], excludes: [] },
      })
    ).toThrow();
  });
  test("should filter data", () => {
    const filteredData = filterAndSortEncodedData(output, "", "", "desc", {
      engravings: { includes: ["버스트"] },
    });
    // compare object
    expect(filteredData).toEqual({
      keys: outputKeys,
      enData: [outputEnData[0]],
    });
  });
  test("should filter data", () => {
    const filteredData = filterAndSortEncodedData(output, "", "", "desc", {
      engravings: { excludes: ["버스트"] },
    });
    // compare object
    expect(filteredData).toEqual({
      keys: outputKeys,
      enData: [outputEnData[1]],
    });
  });
  test("should sort data desc", () => {
    const filteredData = filterAndSortEncodedData(
      output,
      "skillDPS",
      "종말의 날",
      "desc",
      {}
    );
    // compare object
    expect(filteredData).toEqual({
      keys: outputKeys,
      enData: [outputEnData[0], outputEnData[1]],
    });
  });
  test("should sort data asc", () => {
    const filteredData = filterAndSortEncodedData(
      output,
      "skillDPS",
      "종말의 날",
      "asc",
      {}
    );
    // compare object
    expect(filteredData).toEqual({
      keys: outputKeys,
      enData: [outputEnData[1], outputEnData[0]],
    });
  });
});

describe("Decoding", () => {
  test("should decode 0 index", () => {
    const barcode = new Barcoding(input);
    const decodedRow = barcode.decodeRow(0);
    console.log(decodedRow);
    // compare object
    // identifier: should be same
    expect(decodedRow.identifier).toEqual(input[0].identifier);
    // sortable: if sortable[groupName][option] can be 0 if original data does not have option
    for (const groupName in decodedRow.sortable) {
      for (const option in decodedRow.sortable[groupName]) {
        if (decodedRow.sortable[groupName][option] !== 0) {
          expect(decodedRow.sortable[groupName][option]).toBe(
            input[0].sortable[groupName][option]
          );
        } else {
          // input[0].sortable[groupName][option] can be undefined or 0
          if (input[0].sortable[groupName][option] === undefined) {
            expect(input[0].sortable[groupName][option]).toBeUndefined();
          } else {
            expect(input[0].sortable[groupName][option]).toBe(0);
          }
        }
      }
    }
    // filterable: order of filterable[groupName] can be different
    for (const groupName in decodedRow.filterable) {
      expect(decodedRow.filterable[groupName].sort()).toEqual(
        input[0].filterable[groupName].sort()
      );
    }
    console.log(decodedRow);
  });
});
