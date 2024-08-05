import filterData, { validateFilters } from "./filterData";
// sort & filter & ratio
export default function filterAndSortEncodedData(encodedData, sortGroup = "", sortOption = "", sortDirection = "desc", filters = {}) {
    const doSort = sortGroup.length > 0 || sortOption.length > 0;
    const { keys, enData } = encodedData;
    // Validate filters parameters
    validateFilters(filters, keys);
    // Validate sortGroup and sortOption
    if (doSort &&
        !(keys.sortKey[sortGroup] && keys.sortKey[sortGroup].includes(sortOption))) {
        throw new Error(`Invalid sort option: ${sortGroup} => ${sortOption}`);
    }
    // Filter data
    const filteredEnData = filterData(enData, filters, keys.filterKey);
    // Sort data
    if (doSort) {
        const optionIndex = keys.sortKey[sortGroup].indexOf(sortOption);
        filteredEnData.sort((a, b) => {
            if (sortDirection === "asc") {
                return (a.sortable[sortGroup][optionIndex] -
                    b.sortable[sortGroup][optionIndex]);
            }
            else {
                return (b.sortable[sortGroup][optionIndex] -
                    a.sortable[sortGroup][optionIndex]);
            }
        });
    }
    return { keys, enData: filteredEnData };
}
