"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeys = generateKeys;
function generateKeys(data) {
    // Generate sortKey and filterKey without duplicates
    const sortKeySets = {};
    const filterKeySets = {};
    for (const row of data) {
        const { sortable, filterable } = row;
        for (const key in sortable) {
            if (!sortKeySets[key]) {
                sortKeySets[key] = new Set();
            }
            for (const sortableKey in sortable[key]) {
                sortKeySets[key].add(sortableKey);
            }
        }
        for (const key in filterable) {
            if (!filterKeySets[key]) {
                filterKeySets[key] = new Set();
            }
            for (const value of filterable[key]) {
                filterKeySets[key].add(value);
            }
        }
    }
    const sortKey = {};
    const filterKey = {};
    // Change set to array
    for (const key in sortKeySets) {
        sortKey[key] = Array.from(sortKeySets[key]);
    }
    for (const key in filterKeySets) {
        filterKey[key] = Array.from(filterKeySets[key]);
    }
    return {
        sortKey,
        filterKey,
    };
}
