"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataSets_1 = require("./dataSets");
const encodeData_1 = require("../src/encode/encodeData");
const generateKeys_1 = require("../src/encode/generateKeys");
const { keys: outputKeys, enData: outputEnData } = dataSets_1.encodedData;
describe("Encoding", () => {
    test("should get correct keys", () => {
        // compare object
        expect((0, generateKeys_1.generateKeys)(dataSets_1.data)).toEqual(outputKeys);
    });
    test("should encode to a barcode", () => {
        const encodedData = (0, encodeData_1.encodeData)(dataSets_1.data);
        // compare object
        expect(encodedData).toEqual(dataSets_1.encodedData);
    });
});
describe("Filtering and Sorting", () => {
    test("should return same data without sorting and filtering", () => {
        // const filteredData = filterAndSortEncodedData(output, "", "", {});
        // // compare object
        // expect(filteredData).toEqual(output);
    });
    test("should return error if sort element is not in keys", () => {
        // expect(() =>
        //   filterAndSortEncodedData(output, "notInKeys", "", {})
        // ).toThrow();
    });
    test("should return error if filter element is not in keys", () => {
        // expect(() =>
        //   filterAndSortEncodedData(output, "", "", { notInKeys: [] })
        // ).toThrow();
    });
});
describe("Decoding", () => {
    test("should decode to a barcode", () => {
        // const decodedData = decodeData(encodedData);
        // console.log(JSON.stringify(decodedData));
    });
});
