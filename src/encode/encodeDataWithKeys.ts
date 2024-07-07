import { getGetIndexFunction } from "./getGetIndexFunction";
import BitArray from "./../BitArray";
import EnData from "./../models/EnData";
import Keys from "./../models/Keys";
import RawData, { RawDataRow } from "./../models/RawData";
import RawBitArray from "../models/RawBitArray";

export function encodeDataWithKeys<T>(keys: Keys, data: RawData<T>): EnData<T> {
  const { sortKey, filterKey } = keys;
  const getSortKeyIndex: (groupName: string, value: string) => number =
    getGetIndexFunction(sortKey);
  const getFilterKeyIndex: (groupName: string, value: string) => number =
    getGetIndexFunction(filterKey);

  const enData: EnData<T> = data.map((row: RawDataRow<T>) => {
    const { sortable, filterable, identifier } = row;
    const sortableEncoded: {
      [groupName: string]: number[];
    } = {};
    const filterableEncoded: {
      [groupName: string]: RawBitArray;
    } = {};
    for (const groupName in sortKey) {
      sortableEncoded[groupName] = new Array(sortKey[groupName].length).fill(0);
      if (groupName in sortable) {
        for (const sortableKey in sortable[groupName]) {
          const index: number = getSortKeyIndex(groupName, sortableKey);
          sortableEncoded[groupName][index] =
            sortable[groupName][sortableKey] ?? 0;
        }
      }
    }
    for (const groupName in filterKey) {
      // binary encoding for filterable use array buffer then convert to string
      const filterableArray = new BitArray(filterKey[groupName].length);
      if (groupName in filterable) {
        for (const value of filterable[groupName]) {
          const index: number = getFilterKeyIndex(groupName, value);
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
