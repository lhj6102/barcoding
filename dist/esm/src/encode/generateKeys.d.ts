import { Key } from "../models/Keys";
import RawData from "../models/RawData";
export declare function generateKeys(data: RawData<any>): {
    sortKey: Key<string[]>;
    filterKey: Key<string[]>;
};
