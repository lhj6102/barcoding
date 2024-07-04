export function getGetIndexFunction(key) {
    // key: {groupA: [a1, a2, a3], groupB: [b1, b2]}
    // return (groupName, value) => index
    // Using hash map for O(1) lookup
    const indexMap = {};
    for (const groupName in key) {
        indexMap[groupName] = {};
        for (let i = 0; i < key[groupName].length; i++) {
            indexMap[groupName][key[groupName][i]] = i;
        }
    }
    return (groupName, value) => { var _a; return (_a = indexMap[groupName][value]) !== null && _a !== void 0 ? _a : -1; };
}
