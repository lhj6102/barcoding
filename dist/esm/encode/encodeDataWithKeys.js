import { getGetIndexFunction } from "./getGetIndexFunction";
import BitArray from "./../BitArray";
export function encodeDataWithKeys(keys, data) {
    const { sortKey, filterKey } = keys;
    const getSortKeyIndex = getGetIndexFunction(sortKey);
    const getFilterKeyIndex = getGetIndexFunction(filterKey);
    const enData = data.map((row) => {
        const { sortable, filterable, identifier } = row;
        const sortableEncoded = {};
        const filterableEncoded = {};
        for (const groupName in sortable) {
            sortableEncoded[groupName] = new Array(sortKey[groupName].length).fill(0);
            for (const sortableKey in sortable[groupName]) {
                const index = getSortKeyIndex(groupName, sortableKey);
                sortableEncoded[groupName][index] = sortable[groupName][sortableKey];
            }
        }
        for (const groupName in filterable) {
            // binary encoding for filterable use array buffer then convert to string
            const filterableArray = new BitArray(filterKey[groupName].length);
            for (const value of filterable[groupName]) {
                const index = getFilterKeyIndex(groupName, value);
                filterableArray.setBit(index);
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
