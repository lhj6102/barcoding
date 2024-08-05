"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../../src"));
const parseJSONFile_1 = __importDefault(require("../parseJSONFile"));
const generateRandomSorcDataSet_1 = __importDefault(require("./generateRandomSorcDataSet"));
const fs_1 = __importDefault(require("fs"));
describe("create gen data", () => {
    test("should create gen data", () => {
        (0, generateRandomSorcDataSet_1.default)(50000);
    });
});
describe("encode gen data", () => {
    test("should encode gen data", () => {
        const sorceressesRaw = (0, parseJSONFile_1.default)("./___test___/json/genSorceress50000.json");
        const sorceresses = new src_1.default(sorceressesRaw);
        fs_1.default.writeFileSync("./___test___/json/encodedSorceress50000.json", JSON.stringify(sorceresses.getEncodedData()));
    });
});
describe("handle encoded data", () => {
    const sorceressesEn = (0, parseJSONFile_1.default)("./___test___/json/encodedSorceress50000.json");
    const sorceresses = new src_1.default(sorceressesEn);
    test("should handle encoded data", () => {
        expect(sorceresses.length()).toBe(50000);
        console.log(sorceresses.getFilterOptionRatios());
    });
    test("should sort with 종말의 날 - 마력 해방", () => {
        var _a;
        const nextData = sorceresses.filterAndSortData("skillDamage", "종말의 날 - 마력 해방", "desc", {
            engravings: {
                includes: ["점화"],
            },
        });
        // check time
        const nextBarcoding = new src_1.default(nextData);
        const topDamages = [];
        for (let i = 0; i < nextBarcoding.length(); i++) {
            const targetDamage = (_a = nextBarcoding.decodeRow(i).sortable.skillDamage["종말의 날 - 마력 해방"]) !== null && _a !== void 0 ? _a : 0;
            topDamages.push(targetDamage);
        }
        // topDamages are sorted ?
        expect(topDamages).toEqual(topDamages.sort((a, b) => b - a));
    });
    test("should sort with 종말의 날 - 마력 해방 asc", () => {
        var _a;
        const nextData = sorceresses.filterAndSortData("skillDamage", "종말의 날 - 마력 해방", "asc", {
            engravings: {
                includes: ["점화"],
            },
        });
        // check time
        const nextBarcoding = new src_1.default(nextData);
        const topDamages = [];
        for (let i = 0; i < nextBarcoding.length(); i++) {
            const targetDamage = (_a = nextBarcoding.decodeRow(i).sortable.skillDamage["종말의 날 - 마력 해방"]) !== null && _a !== void 0 ? _a : 0;
            topDamages.push(targetDamage);
        }
        // topDamages are sorted ?
        expect(topDamages).toEqual(topDamages.sort((a, b) => a - b));
    });
});
