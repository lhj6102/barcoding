import parseJSONFile from "../parseJSONFile";
import Barcoding from "../../src";
describe("encode sorceresses", () => {
    const sorceresses = parseJSONFile("./___test___/sorceresses/sorceresses.json");
    const barcoding = new Barcoding(sorceresses);
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
        const nextBarcoding = new Barcoding(nextData);
        for (let i = 0; i < nextBarcoding.length(); i++) {
            console.log(nextBarcoding.decodeRow(i));
        }
        console.log(nextBarcoding.getFilterOptionRatios());
    });
});
