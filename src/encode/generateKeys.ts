import { Key } from "../models/Keys";
import RawData from "../models/RawData";

export function generateKeys(data: RawData<any>) {
  // Generate sortKey and filterKey without duplicates
  const sortKeySets: Key<Set<string>> = {};
  const filterKeySets: Key<Set<string>> = {};
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

  const sortKey: Key = {};
  const filterKey: Key = {};

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
