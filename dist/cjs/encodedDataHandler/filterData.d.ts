import Filters from "../models/Filters";
import { Key } from "../models/Keys";
import EnData, { EnDataRow } from "../models/EnData";
import RawBitArray from "../models/RawBitArray";
type RawBitArrayFilters = {
    [groupName: string]: {
        includes: RawBitArray;
        excludes: RawBitArray;
    };
};
export declare function validateFilters(filters: Filters, keys: any): void;
export default function filterData<T>(enData: EnData<T>, filters: Filters, filterKey: Key): EnData<T>;
export declare function filterRow<T>(row: EnDataRow<T>, rawBitArrayFilters: RawBitArrayFilters): boolean;
export {};
