import { EnDataRow } from "../models/EnData";
import Keys from "../models/Keys";
import { RawDataRow } from "../models/RawData";
export default function decodeRow<T>(row: EnDataRow<T>, keys: Keys): RawDataRow<T>;
