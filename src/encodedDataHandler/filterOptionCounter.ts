import Filters from "../models/Filters";
import EncodedData from "../models/EncodedData";
import filterData, { validateFilters } from "./filterData";
import EnData from "../models/EnData";
import FilterOptionCount from "../models/FilterOptionCount";
import RawBitArray from "../models/RawBitArray";
import BitArray from "../BitArray";

export default function filterOptionCounter<T>(
  encodedData: EncodedData<T>
): FilterOptionCount {
  const { keys, enData } = encodedData;
  const filterKey = keys.filterKey;
  const filterOptionCountArray: {
    [groupName: string]: number[];
  } = {};
  // initialize filterOptionCountArray
  for (const filterGroup in filterKey) {
    filterOptionCountArray[filterGroup] = Array(
      filterKey[filterGroup].length
    ).fill(0);
  }
  for (const row of enData) {
    const filterable = row.filterable;
    for (const filterGroup in filterable) {
      const filterGroupOptionIndexes = BitArray.bitArrayBitIndexes(
        filterable[filterGroup]
      );
      for (const filterGroupOptionIndex of filterGroupOptionIndexes) {
        filterOptionCountArray[filterGroup][filterGroupOptionIndex]++;
      }
    }
  }

  // convert filterOptionCountArray to FilterOptionCount
  const filterOptionCountResult: FilterOptionCount = {};
  for (const filterGroup in filterOptionCountArray) {
    filterOptionCountResult[filterGroup] = {};
    for (let i = 0; i < filterOptionCountArray[filterGroup].length; i++) {
      filterOptionCountResult[filterGroup][filterKey[filterGroup][i]] =
        filterOptionCountArray[filterGroup][i];
    }
  }
  return filterOptionCountResult;
}
