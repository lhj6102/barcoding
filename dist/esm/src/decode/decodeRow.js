import BitArray from "../BitArray";
export default function decodeRow(row, keys) {
    const { identifier, sortable, filterable } = row;
    const resultRow = {
        identifier,
        sortable: {},
        filterable: {},
    };
    // Decode sortable data
    for (const groupName in sortable) {
        const group = sortable[groupName];
        const groupKeys = keys.sortKey[groupName];
        const decodedGroup = {};
        for (let i = 0; i < group.length; i++) {
            decodedGroup[groupKeys[i]] = group[i];
        }
        resultRow.sortable[groupName] = decodedGroup;
    }
    // Decode filterable data
    for (const groupName in filterable) {
        const groupKey = keys.filterKey[groupName];
        const decodedGroup = [];
        const dataLength = groupKey.length;
        const rawBitArray = filterable[groupName];
        // decode bit array to handle
        const bitArray = new BitArray(dataLength, rawBitArray);
        for (let i = 0; i < dataLength; i++) {
            if (bitArray.getBit(i)) {
                decodedGroup.push(groupKey[i]);
            }
        }
        resultRow.filterable[groupName] = decodedGroup;
    }
    return resultRow;
}
