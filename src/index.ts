import BitArray from "./BitArray";
import { generateKeys } from "./encode/generateKeys";

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
    const { sortable, filterable, identifier } = row;
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
  return { keys, enData: encodeDataWithKeys(keys, data) };
}

// sort & filter & ratio
export function filterAndSortEncodedData(
  encodedData: any,
  sortGroup: string | "",
  sortTarget: string | "",
  filters: {
    [key: string]: {
      includes: string[];
      excludes: string[];
    };
  }
) {
  const { keys, enData } = encodedData;
  // Check parameters are valid(use encodedData.keys)

  // Filter data
  const filteredData = enData.filter((row: any) => {
    return true;
  });
  // get row data and check if it passes filter
  // if it passes, add data count (e.g. filterDataCount[group][index]++), (e.g. filterGroupA:[3] => ["00011"] => filterDataCount[filterGroupA][0]++, filterDataCount[filterGroupA][1]++)
  // add total data count

  // Get ratio of filter data count

  // Sort data with sortGroup and sortTarget

  // return {
  //   enData:
  //   keys,
  // };
}
