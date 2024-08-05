import Barcoding from "../src";
import parseJSONFile from "./parseJSONFile";
describe("should use encoded data", () => {
    const data = parseJSONFile("./___test___/json/encodedData50000.json");
    const dataBarcode = new Barcoding(data);
    test("should construct encoded data", () => {
        const encodedData = dataBarcode.getEncodedData();
    });
    test("should sort data", () => {
        // sort by skillDPS: 천벌
        const sortGroup = "skillDPS";
        const sortOption = "천벌";
        const sortedData = new Barcoding(dataBarcode.filterAndSortData(sortGroup, sortOption, "desc", {}));
        for (let i = 0; i < 10; i++) {
            console.log(sortedData.decodeRow(i).sortable.skillDPS);
        }
    });
    test("should filter data", () => {
        const keys = dataBarcode.getKeys();
        const filteredData = new Barcoding(dataBarcode.filterAndSortData("", "", "desc", {
            engravings: {
                includes: ["점화"],
                excludes: ["환류"],
            },
            tierSets: {
                includes: ["6악몽"],
            },
        }));
    });
    test("should filter and sort data", () => {
        const keys = dataBarcode.getKeys();
        const filteredData = new Barcoding(dataBarcode.filterAndSortData("skillDPS", "천벌", "desc", {
            engravings: {
                includes: ["점화"],
                excludes: ["환류"],
            },
            tierSets: {
                includes: ["6악몽"],
            },
        }));
        for (let i = 0; i < 10; i++) {
            console.log(filteredData.decodeRow(i));
        }
        console.log(filteredData.length());
    });
    test("should count filter options", () => {
        const dataWithTwoRows = [
            dataBarcode.getEncodedData().enData[0],
            dataBarcode.getEncodedData().enData[1],
        ];
        const barcode = new Barcoding({
            keys: dataBarcode.getKeys(),
            enData: dataWithTwoRows,
        });
        const filterOptionCounts = barcode.getFilterOptionCounts();
        const filterOptionRatios = barcode.getFilterOptionRatios();
        console.log(filterOptionCounts, filterOptionRatios);
        console.log(barcode.decodeRow(0), barcode.decodeRow(1));
    });
    test("should count filter options for all data", () => {
        const filterOptionCounts = dataBarcode.getFilterOptionCounts();
        const filterOptionRatios = dataBarcode.getFilterOptionRatios();
        console.log(filterOptionCounts, filterOptionRatios);
    });
    test("should count filter options for filtered data", () => {
        const filteredData = new Barcoding(dataBarcode.filterAndSortData("skillDPS", "천벌", "desc", {
            engravings: {
                includes: ["점화"],
                excludes: ["환류"],
            },
            tierSets: {
                includes: ["6악몽"],
            },
        }));
        const filterOptionRatios = filteredData.getFilterOptionRatios();
        expect(filterOptionRatios.engravings["점화"]).toBe(1);
        expect(filterOptionRatios.engravings["환류"]).toBe(0);
        expect(filterOptionRatios.tierSets["6악몽"]).toBe(1);
    });
});
