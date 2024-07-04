import BitArray from "../BitArray";
import { EnDataRow } from "../models/EnData";
import Keys from "../models/Keys";
import { RawDataRow } from "../models/RawData";

export default function decodeRow<T>(row: EnDataRow<T>, keys: Keys) {
  const { identifier, sortable, filterable } = row;
  const resultRow = {
    identifier,
    sortable: {},
    filterable: {},
  } as RawDataRow<T>;

  // Decode sortable data
  for (const groupName in sortable) {
    const group = sortable[groupName];
    const groupKeys = keys.sortKey[groupName];
    const decodedGroup = {} as { [key: string]: number };

    for (let i = 0; i < group.length; i++) {
      decodedGroup[groupKeys[i]] = group[i];
    }
    resultRow.sortable[groupName] = decodedGroup;
  }

  // Decode filterable data
  for (const groupName in filterable) {
    const groupKey = keys.filterKey[groupName];
    const decodedGroup = [] as string[];
    const dataLength = groupKey.length;
    const rawBitArray = filterable[groupName];
    // decode bit array to handle
    const bitArray = new BitArray(dataLength, rawBitArray);
    for (let i = 0; i < dataLength; i++) {
      if (bitArray.getBit(i)) {
        decodedGroup.push(groupKey[i]);
      }
    }

    resultRow.filterable[groupName] = decodedGroup;
  }

  return resultRow;
}
