"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genData2_json_1 = __importDefault(require("./json/genData2.json"));
const genData1000_json_1 = __importDefault(require("./json/genData1000.json"));
const genData10000_json_1 = __importDefault(require("./json/genData10000.json"));
const src_1 = __importDefault(require("../src"));
describe("should encode data to barcode", () => {
    test("should encode data to barcode", () => {
        const data = genData2_json_1.default;
        const genData2Barcode = new src_1.default(data);
    });
});
describe("should compare data 1000 and 10000", () => {
    test("should compare data 1000 and 10000 keys", () => {
        const data1000 = genData1000_json_1.default;
        const data10000 = genData10000_json_1.default;
        const data1000Barcode = new src_1.default(data1000);
        const data10000Barcode = new src_1.default(data10000);
        const keys1000 = data1000Barcode.getKeys();
        const keys10000 = data10000Barcode.getKeys();
        compareSortKey(keys1000.sortKey, keys10000.sortKey);
        function compareSortKey(sortKey1, sortKey2) {
            // compare groupNames
            expect(Object.keys(sortKey1).sort()).toEqual(Object.keys(sortKey2).sort());
            // compare options
            for (const groupName in sortKey1) {
                expect(sortKey1[groupName].sort()).toEqual(sortKey2[groupName].sort());
            }
        }
    });
});
