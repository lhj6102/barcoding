import Barcoding from "../../src";
import parseJSONFile from "../parseJSONFile";
import generateRandomSorcDataSet from "./generateRandomSorcDataSet";
import fs from "fs";
describe("create gen data", () => {
    test("should create gen data", () => {
        generateRandomSorcDataSet(50000);
    });
});
describe("encode gen data", () => {
    test("should encode gen data", () => {
        const sorceressesRaw = parseJSONFile("./___test___/json/genSorceress50000.json");
        const sorceresses = new Barcoding(sorceressesRaw);
        fs.writeFileSync("./___test___/json/encodedSorceress50000.json", JSON.stringify(sorceresses.getEncodedData()));
    });
});
describe("handle encoded data", () => {
    const sorceressesEn = parseJSONFile("./___test___/json/encodedSorceress50000.json");
    const sorceresses = new Barcoding(sorceressesEn);
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
        const nextBarcoding = new Barcoding(nextData);
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
        const nextBarcoding = new Barcoding(nextData);
        const topDamages = [];
        for (let i = 0; i < nextBarcoding.length(); i++) {
            const targetDamage = (_a = nextBarcoding.decodeRow(i).sortable.skillDamage["종말의 날 - 마력 해방"]) !== null && _a !== void 0 ? _a : 0;
            topDamages.push(targetDamage);
        }
        // topDamages are sorted ?
        expect(topDamages).toEqual(topDamages.sort((a, b) => a - b));
    });
});
