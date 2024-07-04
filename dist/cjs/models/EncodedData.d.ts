import EnData from "./EnData";
import Keys from "./Keys";
export default interface EncodedData<T> {
    keys: Keys;
    enData: EnData<T>;
}
