import { encodeDataWithKeys } from "./encodeDataWithKeys";
import EncodedData from "../models/EncodedData";
import Keys from "../models/Keys";
import RawData from "../models/RawData";
import { generateKeys } from "./generateKeys";

export function encodeData<T>(data: RawData<T>): EncodedData<T> {
  const keys: Keys = generateKeys(data);
  return { keys, enData: encodeDataWithKeys(keys, data) };
}
