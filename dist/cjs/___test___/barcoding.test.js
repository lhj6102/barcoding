"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSets_1 = require("./dataSets");
const encodeData_1 = require("../src/encode/encodeData");
const generateKeys_1 = require("../src/encode/generateKeys");
const filterAndSortEncodedData_1 = __importDefault(require("../src/encodedDataHandler/filterAndSortEncodedData"));
const { keys: outputKeys, enData: outputEnData } = dataSets_1.encodedData;
const index_1 = __importDefault(require("../src/index"));
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
        const filteredData = (0, filterAndSortEncodedData_1.default)(dataSets_1.encodedData, "", "", "desc", {});
        // compare object
        expect(filteredData).toEqual(dataSets_1.encodedData);
    });
    test("should return error if sort element is not in keys", () => {
        expect(() => (0, filterAndSortEncodedData_1.default)(dataSets_1.encodedData, "notInKeys", "", "desc", {})).toThrow();
    });
    test("should return error if filter element is not in keys", () => {
        expect(() => (0, filterAndSortEncodedData_1.default)(dataSets_1.encodedData, "", "", "desc", {
            notInKeys: { includes: [], excludes: [] },
        })).toThrow();
    });
    test("should filter data", () => {
        const filteredData = (0, filterAndSortEncodedData_1.default)(dataSets_1.encodedData, "", "", "desc", {
            engravings: { includes: ["버스트"] },
        });
        // compare object
        expect(filteredData).toEqual({
            keys: outputKeys,
            enData: [outputEnData[0]],
        });
    });
    test("should filter data", () => {
        const filteredData = (0, filterAndSortEncodedData_1.default)(dataSets_1.encodedData, "", "", "desc", {
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
    test("should decode 0 index", () => {
        const barcode = new index_1.default(dataSets_1.data);
        const decodedRow = barcode.decodeRow(0);
        console.log(decodedRow);
        // compare object
        // identifier: should be same
        expect(decodedRow.identifier).toEqual(dataSets_1.data[0].identifier);
        // sortable: if sortable[groupName][option] can be 0 if original data does not have option
        for (const groupName in decodedRow.sortable) {
            for (const option in decodedRow.sortable[groupName]) {
                if (decodedRow.sortable[groupName][option] !== 0) {
                    expect(decodedRow.sortable[groupName][option]).toBe(dataSets_1.data[0].sortable[groupName][option]);
                }
                else {
                    // input[0].sortable[groupName][option] can be undefined or 0
                    if (dataSets_1.data[0].sortable[groupName][option] === undefined) {
                        expect(dataSets_1.data[0].sortable[groupName][option]).toBeUndefined();
                    }
                    else {
                        expect(dataSets_1.data[0].sortable[groupName][option]).toBe(0);
                    }
                }
            }
        }
        // filterable: order of filterable[groupName] can be different
        for (const groupName in decodedRow.filterable) {
            expect(decodedRow.filterable[groupName].sort()).toEqual(dataSets_1.data[0].filterable[groupName].sort());
        }
        console.log(decodedRow);
    });
});
