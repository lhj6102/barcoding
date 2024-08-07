import { encodeData } from "./encode/encodeData";
import {
  EncodedData,
  Keys,
  RawData,
  RawDataRow,
  FilterOptionCount,
  Filters,
  RawBitArray,
  EnData,
  EnDataRow,
  Key,
  FilterOptionRatio,
} from "./models";

import decodeRow from "./decode/decodeRow";
import filterAndSortEncodedData from "./encodedDataHandler/filterAndSortEncodedData";
import filterOptionCounter from "./encodedDataHandler/filterOptionCounter";

/**
 * Barcode generation and encoded data handling
 */
class Barcoding<T> {
  #data: EncodedData<T>;
  #isSet: boolean;
  constructor(inputData?: RawData<T> | EncodedData<T>) {
    if (inputData) {
      this.#isSet = true;
      // check if input data is already encoded
      const isEncoded = (inputData as EncodedData<T>).enData !== undefined;
      this.#data = isEncoded
        ? (inputData as EncodedData<T>)
        : this.#encodeData(inputData as RawData<T>);
    } else {
      this.#isSet = false;
      this.#data = {
        keys: {
          sortKey: {},
          filterKey: {},
        },
        enData: [],
      };
    }
  }

  #encodeData(rawData: RawData<T>): EncodedData<T> {
    return encodeData<T>(rawData);
  }

  // setData
  setData(data: EncodedData<T>): void {
    this.#data = data;
    this.#isSet = true;
  }

  // setDataFromRawData
  setDataFromRawData(rawData: RawData<T>): void {
    this.#data = this.#encodeData(rawData);
    this.#isSet = true;
  }

  getEncodedData(): EncodedData<T> {
    if (!this.#isSet) {
      throw new Error("Data is not set");
    }
    return this.#data;
  }

  // getKeys
  getKeys(): Keys {
    return this.#data.keys;
  }

  filterAndSortData(
    sortGroup: string | "" = "",
    sortOption: string | "" = "",
    sortDirection: "asc" | "desc" = "desc",
    filters: Filters = {}
  ): EncodedData<T> {
    return filterAndSortEncodedData<T>(
      this.#data,
      sortGroup,
      sortOption,
      sortDirection,
      filters
    );
  }

  length(): number {
    return this.#data.enData.length;
  }

  getFilterOptionCounts(): FilterOptionCount {
    return filterOptionCounter<T>(this.#data);
  }

  getFilterOptionRatios(): FilterOptionRatio {
    const filterOptionCounts = this.getFilterOptionCounts();
    const filterOptionRatios: FilterOptionRatio = {};
    for (const filterGroup in filterOptionCounts) {
      filterOptionRatios[filterGroup] = {};
      const totalCount = this.length();
      for (const filterOption in filterOptionCounts[filterGroup]) {
        const count = filterOptionCounts[filterGroup][filterOption];
        filterOptionRatios[filterGroup][filterOption] = count / totalCount;
      }
    }
    return filterOptionRatios;
  }

  decodeRow(index: number): RawDataRow<T> {
    return decodeRow(this.#data.enData[index], this.#data.keys);
  }

  decodeRows(startIndex: number, endIndex: number): RawDataRow<T>[] {
    const decodedRows: RawDataRow<T>[] = [];
    const maxIndex = Math.min(endIndex, this.length());
    for (let i = startIndex; i < maxIndex; i++) {
      decodedRows.push(this.decodeRow(i));
    }
    return decodedRows;
  }
}

// export models
export {
  Barcoding,
  EncodedData,
  Keys,
  RawData,
  RawDataRow,
  FilterOptionCount,
  Filters,
  RawBitArray,
  EnData,
  EnDataRow,
  Key,
  FilterOptionRatio,
};
