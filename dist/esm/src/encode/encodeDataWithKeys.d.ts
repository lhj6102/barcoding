import EnData from "./../models/EnData";
import Keys from "./../models/Keys";
import RawData from "./../models/RawData";
export declare function encodeDataWithKeys<T>(keys: Keys, data: RawData<T>): EnData<T>;
