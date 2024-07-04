"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilters = validateFilters;
exports.default = filterData;
exports.filterRow = filterRow;
const BitArray_1 = __importDefault(require("../BitArray"));
function validateFilters(filters, keys) {
    var _a, _b;
    for (const groupName in filters) {
        const includes = (_a = filters[groupName].includes) !== null && _a !== void 0 ? _a : [];
        const excludes = (_b = filters[groupName].excludes) !== null && _b !== void 0 ? _b : [];
        for (const option of includes) {
            if (!isOptionInFilterKey(groupName, option, keys.filterKey)) {
                throw new Error(`Invalid filter option: ${groupName} includes ${option}`);
            }
        }
        for (const option of excludes) {
            if (!isOptionInFilterKey(groupName, option, keys.filterKey)) {
                throw new Error(`Invalid filter option: ${groupName} excludes ${option}`);
            }
        }
    }
}
function isOptionInFilterKey(groupName, option, filterKey) {
    return filterKey[groupName].includes(option);
}
function filterData(enData, filters, filterKey) {
    var _a, _b;
    // make include and exclude raw bit array for each group
    const rawBitArrayFilters = {};
    for (const groupName in filters) {
        rawBitArrayFilters[groupName] = { includes: [], excludes: [] };
        // create raw bit array for includes
        rawBitArrayFilters[groupName].includes = createIncludesRawBitArray((_a = filters[groupName].includes) !== null && _a !== void 0 ? _a : [], filterKey[groupName]);
        // create raw bit array for excludes
        rawBitArrayFilters[groupName].excludes = createExcludesRawBitArray((_b = filters[groupName].excludes) !== null && _b !== void 0 ? _b : [], filterKey[groupName]);
    }
    // for each row, check if it passes filter
    const filteredEnData = enData.filter((row, idx) => {
        const pass = filterRow(row, rawBitArrayFilters);
        console.log("🚀 ~ filteredData ~ idx:", idx, pass);
        return filterRow(row, rawBitArrayFilters);
    });
    return filteredEnData;
}
function createIncludesRawBitArray(includes, filterKey) {
    // set all bit to 0
    const bitArray = new BitArray_1.default(filterKey.length);
    const includesSet = new Set(includes);
    filterKey.forEach((option, index) => {
        // get index of includes and set bit to 1
        if (includesSet.has(option)) {
            bitArray.setBit(index, 1);
        }
    });
    return bitArray.getBitArray();
}
function createExcludesRawBitArray(excludes, filterKey) {
    // set all bit to 0
    const bitArray = new BitArray_1.default(filterKey.length);
    const excludesSet = new Set(excludes);
    filterKey.forEach((option, index) => {
        // get index of excludes and set bit to 1
        if (excludesSet.has(option)) {
            bitArray.setBit(index, 1);
        }
    });
    return bitArray.getBitArray();
}
function filterRow(row, rawBitArrayFilters) {
    for (const groupName in rawBitArrayFilters) {
        const { includes, excludes } = rawBitArrayFilters[groupName];
        const filterable = row.filterable[groupName];
        // check if filterable passes includes
        // include & target = include
        const includesAnd = BitArray_1.default.bitArrayAnd(filterable, includes);
        if (!BitArray_1.default.bitArrayEqual(includesAnd, includes))
            return false;
        // check if filterable passes excludes
        const excludesAnd = BitArray_1.default.bitArrayAnd(filterable, excludes);
        if (!BitArray_1.default.bitArrayIsZero(excludesAnd))
            return false;
        // filter | target = 0
        for (let i = 0; i < excludes.length; i++) {
            if ((filterable[i] & excludes[i]) !== 0) {
                return false;
            }
        }
    }
    return true;
}
