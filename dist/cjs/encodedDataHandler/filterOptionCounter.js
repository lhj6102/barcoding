"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filterOptionCounter;
const BitArray_1 = __importDefault(require("../BitArray"));
function filterOptionCounter(encodedData) {
    const { keys, enData } = encodedData;
    const filterKey = keys.filterKey;
    const filterOptionCountArray = {};
    // initialize filterOptionCountArray
    for (const filterGroup in filterKey) {
        filterOptionCountArray[filterGroup] = Array(filterKey[filterGroup].length).fill(0);
    }
    for (const row of enData) {
        const filterable = row.filterable;
        for (const filterGroup in filterable) {
            const filterGroupOptionIndexes = BitArray_1.default.bitArrayBitIndexes(filterable[filterGroup]);
            for (const filterGroupOptionIndex of filterGroupOptionIndexes) {
                filterOptionCountArray[filterGroup][filterGroupOptionIndex]++;
            }
        }
    }
    // convert filterOptionCountArray to FilterOptionCount
    const filterOptionCountResult = {};
    for (const filterGroup in filterOptionCountArray) {
        filterOptionCountResult[filterGroup] = {};
        for (let i = 0; i < filterOptionCountArray[filterGroup].length; i++) {
            filterOptionCountResult[filterGroup][filterKey[filterGroup][i]] =
                filterOptionCountArray[filterGroup][i];
        }
    }
    return filterOptionCountResult;
}