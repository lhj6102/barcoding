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
