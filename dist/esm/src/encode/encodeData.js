import { encodeDataWithKeys } from "./encodeDataWithKeys";
import { generateKeys } from "./generateKeys";
export function encodeData(data) {
    const keys = generateKeys(data);
    return { keys, enData: encodeDataWithKeys(keys, data) };
}
