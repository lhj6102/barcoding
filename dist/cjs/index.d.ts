import { EncodedData, Keys, RawData, RawDataRow, FilterOptionCount, Filters, RawBitArray, EnData, EnDataRow, Key, FilterOptionRatio } from "./models";
/**
 * Barcode generation and encoded data handling
 */
export default class Barcoding<T> {
    #private;
    constructor(inputData?: RawData<T> | EncodedData<T>);
    setData(data: EncodedData<T>): void;
    setDataFromRawData(rawData: RawData<T>): void;
    getEncodedData(): EncodedData<T>;
    getKeys(): Keys;
    filterAndSortData(sortGroup?: string | "", sortOption?: string | "", sortDirection?: "asc" | "desc", filters?: Filters): EncodedData<T>;
    length(): number;
    getFilterOptionCounts(): FilterOptionCount;
    getFilterOptionRatios(): FilterOptionRatio;
    decodeRow(index: number): RawDataRow<T>;
    decodeRows(startIndex: number, endIndex: number): RawDataRow<T>[];
}
export { EncodedData, Keys, RawData, RawDataRow, FilterOptionCount, Filters, RawBitArray, EnData, EnDataRow, Key, FilterOptionRatio, };
