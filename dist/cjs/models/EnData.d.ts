import RawBitArray from "./RawBitArray";
export default interface EnData<T> extends Array<EnDataRow<T>> {
}
export interface EnDataRow<T = any> {
    identifier: T;
    sortable: {
        [key: string]: number[];
    };
    filterable: {
        [key: string]: RawBitArray;
    };
}
