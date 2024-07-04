import EncodedData from "./models/EncodedData";
import Keys from "./models/Keys";
import RawData from "./models/RawData";
/**
 * Barcode generation and encoded data handling
 */
export default class Barcoding<T> {
    #private;
    constructor(inputData?: RawData<T> | EncodedData<T>, isEncoded?: boolean);
    setData(data: EncodedData<T>): void;
    setDataFromRawData(rawData: RawData<T>): void;
    getEncodedData(): EncodedData<T>;
    getKeys(): Keys;
}
