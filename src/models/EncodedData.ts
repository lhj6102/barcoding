import EnData from "./EnData";
import Keys from "./Keys";

// Model for encoded data set with Endata and Keys
// T for identifier type
export default interface EncodedData<T> {
  keys: Keys;
  enData: EnData<T>;
}
