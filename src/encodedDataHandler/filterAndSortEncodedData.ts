import Filters from "../models/Filters";
import { Key } from "../models/Keys";
import EnData, { EnDataRow } from "../models/EnData";
import EncodedData from "../models/EncodedData";
import RawBitArray from "../models/RawBitArray";
import BitArray from "../BitArray";

type RawBitArrayFilters = {
  [groupName: string]: { includes: RawBitArray; excludes: RawBitArray };
};

// sort & filter & ratio
export default function filterAndSortEncodedData<T>(
  encodedData: EncodedData<T>,
  sortGroup: string | "" = "",
  sortOption: string | "" = "",
  filters: Filters = {}
): EncodedData<T> {
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
  const filteredEnData = filterData(enData, filters, keys.filterKey);

  // Sort data

  // TODO: Determine make new instance or just return result;

  return { keys, enData: filteredEnData };
}

function validateFilters(filters: Filters, keys: any) {
  for (const groupName in filters) {
    const includes: string[] = filters[groupName].includes ?? [];
    const excludes: string[] = filters[groupName].excludes ?? [];
    for (const option of includes) {
      if (!isOptionInFilterKey(groupName, option, keys.filterKey)) {
        throw new Error(
          `Invalid filter option: ${groupName} includes ${option}`
        );
      }
    }
    for (const option of excludes) {
      if (!isOptionInFilterKey(groupName, option, keys.filterKey)) {
        throw new Error(
          `Invalid filter option: ${groupName} excludes ${option}`
        );
      }
    }
  }
}

function isOptionInFilterKey(
  groupName: string,
  option: string,
  filterKey: Key
): boolean {
  return filterKey[groupName].includes(option);
}

function filterData<T>(
  enData: EnData<T>,
  filters: Filters,
  filterKey: Key
): EnData<T> {
  // make include and exclude raw bit array for each group
  const rawBitArrayFilters: RawBitArrayFilters = {};
  for (const groupName in filters) {
    rawBitArrayFilters[groupName] = { includes: [], excludes: [] };
    // create raw bit array for includes
    rawBitArrayFilters[groupName].includes = createIncludesRawBitArray(
      filters[groupName].includes ?? [],
      filterKey[groupName]
    );
    // create raw bit array for excludes
    rawBitArrayFilters[groupName].excludes = createExcludesRawBitArray(
      filters[groupName].excludes ?? [],
      filterKey[groupName]
    );
  }

  // for each row, check if it passes filter
  const filteredEnData = enData.filter((row, idx) => {
    const pass = filterRow(row, rawBitArrayFilters);
    console.log("🚀 ~ filteredData ~ idx:", idx, pass);

    return filterRow(row, rawBitArrayFilters);
  });

  return filteredEnData;
}

function createIncludesRawBitArray(includes: string[], filterKey: string[]) {
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

function createExcludesRawBitArray(excludes: string[], filterKey: string[]) {
  // set all bit to 0
  const bitArray = new BitArray(filterKey.length);
  const excludesSet = new Set(excludes);
  filterKey.forEach((option, index) => {
    // get index of excludes and set bit to 1
    if (excludesSet.has(option)) {
      bitArray.setBit(index, 1);
    }
  });
  return bitArray.getBitArray();
}

export function filterRow<T>(
  row: EnDataRow<T>,
  rawBitArrayFilters: RawBitArrayFilters
): boolean {
  for (const groupName in rawBitArrayFilters) {
    const { includes, excludes } = rawBitArrayFilters[groupName];
    const filterable = row.filterable[groupName];
    // check if filterable passes includes
    // include & target = include
    const includesAnd = BitArray.bitArrayAnd(filterable, includes);
    if (!BitArray.bitArrayEqual(includesAnd, includes)) return false;
    // check if filterable passes excludes
    const excludesAnd = BitArray.bitArrayAnd(filterable, excludes);
    if (!BitArray.bitArrayIsZero(excludesAnd)) return false;
    // filter | target = 0
    for (let i = 0; i < excludes.length; i++) {
      if ((filterable[i] & excludes[i]) !== 0) {
        return false;
      }
    }
  }
  return true;
}
