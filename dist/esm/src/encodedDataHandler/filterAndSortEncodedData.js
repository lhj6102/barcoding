import BitArray from "../BitArray";
// sort & filter & ratio
export default function filterAndSortEncodedData(encodedData, sortGroup = "", sortOption = "", filters = {}) {
    const { keys, enData } = encodedData;
    // Validate filters parameters
    validateFilters(filters, keys);
    // Validate sortGroup and sortOption
    if (sortGroup && !keys.sortKey[sortGroup]) {
        throw new Error(`Invalid sort group: ${sortGroup}`);
    }
    if (sortOption && !keys.sortKey[sortGroup].includes(sortOption)) {
        throw new Error(`Invalid sort option: ${sortGroup} => ${sortOption}`);
    }
    // Filter data
    const filteredData = enData.filter((row) => {
        return true;
    });
    // get row data and check if it passes filter
    // if it passes, add data count (e.g. filterDataCount[group][index]++), (e.g. filterGroupA:[3] => ["00011"] => filterDataCount[filterGroupA][0]++, filterDataCount[filterGroupA][1]++)
    // add total data count
    // Get ratio of filter data count
    // Sort data with sortGroup and sortOption
    // return {
    //   enData:
    //   keys,
    // };
}
function validateFilters(filters, keys) {
    for (const groupName in filters) {
        const includes = filters[groupName].includes;
        const excludes = filters[groupName].excludes;
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
    // make include and exclude raw bit array for each group
    const rawBitArrayFilters = {};
    for (const groupName in filters) {
        // create raw bit array for includes
        rawBitArrayFilters[groupName].includes = createIncludesRawBitArray(filters[groupName].includes, filterKey[groupName]);
        // create raw bit array for excludes
        rawBitArrayFilters[groupName].excludes = createExcludesRawBitArray(filters[groupName].excludes, filterKey[groupName]);
    }
    // for each row, check if it passes filter
    return enData;
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
    // set all bit to 1
    const bitArray = new BitArray(filterKey.length);
    bitArray.setAll(true);
    const excludesSet = new Set(excludes);
    filterKey.forEach((option, index) => {
        // get index of excludes and set bit to 0
        if (excludesSet.has(option)) {
            bitArray.setBit(index, 0);
        }
    });
    return bitArray.getBitArray();
}
