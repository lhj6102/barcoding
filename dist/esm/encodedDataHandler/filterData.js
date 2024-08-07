import BitArray from "../BitArray";
export function validateFilters(filters, keys) {
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
export default function filterData(enData, filters, filterKey) {
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
        // const pass = filterRow(row, rawBitArrayFilters);
        return filterRow(row, rawBitArrayFilters);
    });
    return filteredEnData;
}
function createIncludesRawBitArray(includes, filterKey) {
    // set all bit to 0
    const bitArray = new BitArray(filterKey.length);
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
    const bitArray = new BitArray(filterKey.length);
    const excludesSet = new Set(excludes);
    filterKey.forEach((option, index) => {
        // get index of excludes and set bit to 1
        if (excludesSet.has(option)) {
            bitArray.setBit(index, 1);
        }
    });
    return bitArray.getBitArray();
}
export function filterRow(row, rawBitArrayFilters) {
    for (const groupName in rawBitArrayFilters) {
        const { includes, excludes } = rawBitArrayFilters[groupName];
        const filterable = row.filterable[groupName];
        // check if filterable passes includes
        // include & target = include
        const includesAnd = BitArray.bitArrayAnd(filterable, includes);
        if (!BitArray.bitArrayEqual(includesAnd, includes))
            return false;
        // check if filterable passes excludes
        const excludesAnd = BitArray.bitArrayAnd(filterable, excludes);
        if (!BitArray.bitArrayIsZero(excludesAnd))
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
