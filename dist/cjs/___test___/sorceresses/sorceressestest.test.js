"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseJSONFile_1 = __importDefault(require("../parseJSONFile"));
const src_1 = __importDefault(require("../../src"));
describe("encode sorceresses", () => {
    const sorceresses = (0, parseJSONFile_1.default)("./___test___/sorceresses/sorceresses.json");
    const barcoding = new src_1.default(sorceresses);
    test("encode sorceresses", () => {
        const encodedData = barcoding.getEncodedData();
        expect(encodedData.enData.length).toBe(36);
        expect(barcoding.length()).toBe(36);
        console.log(barcoding.getFilterOptionCounts());
    });
    test("sort sorceresses", () => {
        const nextData = barcoding.filterAndSortData("skillDamage", "종말의 날 - 마력 해방", "asc", {
            engravings: {
                includes: ["점화"],
                excludes: ["환류"],
            },
        });
        const nextBarcoding = new src_1.default(nextData);
        for (let i = 0; i < nextBarcoding.length(); i++) {
            console.log(nextBarcoding.decodeRow(i));
        }
        console.log(nextBarcoding.getFilterOptionRatios());
    });
});
