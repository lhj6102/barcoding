import { getGetIndexFunction } from "./getGetIndexFunction";
import BitArray from "./../BitArray";
export function encodeDataWithKeys(keys, data) {
    const { sortKey, filterKey } = keys;
    const getSortKeyIndex = getGetIndexFunction(sortKey);
    const getFilterKeyIndex = getGetIndexFunction(filterKey);
    const enData = data.map((row) => {
        var _a;
        const { sortable, filterable, identifier } = row;
        const sortableEncoded = {};
        const filterableEncoded = {};
        for (const groupName in sortKey) {
            sortableEncoded[groupName] = new Array(sortKey[groupName].length).fill(0);
            if (groupName in sortable) {
                for (const sortableKey in sortable[groupName]) {
                    const index = getSortKeyIndex(groupName, sortableKey);
                    sortableEncoded[groupName][index] =
                        (_a = sortable[groupName][sortableKey]) !== null && _a !== void 0 ? _a : 0;
                }
            }
        }
        for (const groupName in filterKey) {
            // binary encoding for filterable use array buffer then convert to string
            const filterableArray = new BitArray(filterKey[groupName].length);
            if (groupName in filterable) {
                for (const value of filterable[groupName]) {
                    const index = getFilterKeyIndex(groupName, value);
                    filterableArray.setBit(index);
                }
            }
            filterableEncoded[groupName] = filterableArray.getBitArray();
        }
        return {
            identifier: identifier,
            sortable: sortableEncoded,
            filterable: filterableEncoded,
        };
    });
    return enData;
}
