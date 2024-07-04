import { getGetIndexFunction } from "./getGetIndexFunction";
import BitArray from "./../BitArray";
import EnData from "./../models/EnData";
import Keys from "./../models/Keys";
import RawData from "./../models/RawData";

export function encodeDataWithKeys<T>(keys: Keys, data: RawData<T>): EnData<T> {
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
