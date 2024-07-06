import { encodeData } from "./encode/encodeData";
import EncodedData from "./models/EncodedData";
import Keys from "./models/Keys";
import RawData, { RawDataRow } from "./models/RawData";
import decodeRow from "./decode/decodeRow";
import filterAndSortEncodedData from "./encodedDataHandler/filterAndSortEncodedData";
import Filters from "./models/Filters";
import FilterOptionCount from "./models/FilterOptionCount";
import filterOptionCounter from "./encodedDataHandler/filterOptionCounter";

/**
 * Barcode generation and encoded data handling
 */
export default class Barcoding<T> {
  #data: EncodedData<T>;
  #isSet: boolean;
  constructor(inputData?: RawData<T> | EncodedData<T>) {
    if (inputData) {
      this.#isSet = true;
      // check if input data is already encoded
      const isEncoded = (inputData as EncodedData<T>).keys !== undefined;
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

  decodeRow(index: number): RawDataRow<T> {
    return decodeRow(this.#data.enData[index], this.#data.keys);
  }

  filterAndSortData(
    sortGroup: string | "" = "",
    sortOption: string | "" = "",
    sortDirection: "asc" | "desc" = "desc",
    filters: Filters = {}
  ) {
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

  getFilterOptionCount(): FilterOptionCount {
    return filterOptionCounter<T>(this.#data);
  }

  // filterData => return another Barcoding instance

  // getTotalCount
  // getFilterElementCount
  // getFilterElementRatio

  // decodeData (using index)
}
