import Filters from "../models/Filters";
import EncodedData from "../models/EncodedData";
import filterData, { validateFilters } from "./filterData";
import EnData from "../models/EnData";

// sort & filter & ratio
export default function filterAndSortEncodedData<T>(
  encodedData: EncodedData<T>,
  sortGroup: string | "" = "",
  sortOption: string | "" = "",
  sortDirection: "asc" | "desc" = "desc",
  filters: Filters = {}
): EncodedData<T> {
  const doSort: boolean = sortGroup.length > 0 || sortOption.length > 0;
  const { keys, enData } = encodedData;
  // Validate filters parameters
  validateFilters(filters, keys);

  // Validate sortGroup and sortOption
  if (
    doSort &&
    !(keys.sortKey[sortGroup] && keys.sortKey[sortGroup].includes(sortOption))
  ) {
    throw new Error(`Invalid sort option: ${sortGroup} => ${sortOption}`);
  }

  // Filter data
  const filteredEnData: EnData<T> = filterData(enData, filters, keys.filterKey);

  // Sort data
  if (doSort) {
    const optionIndex: number = keys.sortKey[sortGroup].indexOf(sortOption);
    filteredEnData.sort((a, b) => {
      if (sortDirection === "asc") {
        return (
          a.sortable[sortGroup][optionIndex] -
          b.sortable[sortGroup][optionIndex]
        );
      } else {
        return (
          b.sortable[sortGroup][optionIndex] -
          a.sortable[sortGroup][optionIndex]
        );
      }
    });
  }

  return { keys, enData: filteredEnData };
}
