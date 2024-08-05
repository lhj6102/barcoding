"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterData_1 = require("../src/encodedDataHandler/filterData");
describe("filterRow", () => {
    test("should return true if row passes all filters", () => {
        const row = {
            identifier: {},
            sortable: {},
            filterable: {
                groupA: [0, 1, 3],
                groupB: [0, 0, 0],
            },
        };
        const rawBitArrayFilters = {
            groupA: {
                includes: [0, 0, 1],
                excludes: [0, 0, 0],
            },
            groupB: {
                includes: [0, 0, 0],
                excludes: [0, 0, 0],
            },
        };
        expect((0, filterData_1.filterRow)(row, rawBitArrayFilters)).toBe(true);
    });
    test("should return false if row fails any filter", () => {
        const row = {
            identifier: {},
            sortable: {},
            filterable: {
                groupA: [1, 1, 1],
                groupB: [0, 0, 0],
            },
        };
        const rawBitArrayFilters = {
            groupA: {
                includes: [0, 0, 0],
                excludes: [1, 1, 1],
            },
            groupB: {
                includes: [1, 1, 1],
                excludes: [0, 0, 0],
            },
        };
        expect((0, filterData_1.filterRow)(row, rawBitArrayFilters)).toBe(false);
    });
});
