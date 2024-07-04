import BitArray from "./BitArray";

export function generateKeys(data: any) {
  // Generate sortKey and filterKey without duplicates
  const sortKey: any = {};
  const filterKey: any = {};
  for (const row of data) {
    const { sortable, filterable } = row;
    for (const key in sortable) {
      if (!sortKey[key]) {
        sortKey[key] = new Set();
      }
      for (const sortableKey in sortable[key]) {
        sortKey[key].add(sortableKey);
      }
    }
    for (const key in filterable) {
      if (!filterKey[key]) {
        filterKey[key] = new Set();
      }
      for (const value of filterable[key]) {
        filterKey[key].add(value);
      }
    }
  }

  // Change set to array
  for (const key in sortKey) {
    sortKey[key] = Array.from(sortKey[key]);
  }
  for (const key in filterKey) {
    filterKey[key] = Array.from(filterKey[key]);
  }

  return {
    sortKey,
    filterKey,
  };
}

function getGetIndexFunction(key: any) {
  // key: {groupA: [a1, a2, a3], groupB: [b1, b2]}
  // return (groupName, value) => index
  // Using hash map for O(1) lookup
  const indexMap: any = {};
  for (const groupName in key) {
    indexMap[groupName] = {};
    for (let i = 0; i < key[groupName].length; i++) {
      indexMap[groupName][key[groupName][i]] = i;
    }
  }
  return (groupName: string, value: string) => indexMap[groupName][value] ?? -1;
}

export function encodeDataWithKeys(keys: any, data: any) {
  const { sortKey, filterKey } = keys;
  const getSortKeyIndex = getGetIndexFunction(sortKey);
  const getFilterKeyIndex = getGetIndexFunction(filterKey);

  const encodedData = data.map((row: any) => {
    const { sortable, filterable, ...identifier } = row;
    const sortableEncoded: any = {};
    const filterableEncoded: any = {};
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

  return encodedData;
}

export function encodeData(data: any) {
  const keys = generateKeys(data);
  return encodeDataWithKeys(keys, data);
}
