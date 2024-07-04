import EnData from "../src/models/EnData";
import Keys from "../src/models/Keys";
import RawData from "../src/models/RawData";
type Identifier = {
    characterName: string;
    className: string;
    id: number;
};
declare const data: RawData<Identifier>;
declare const encodedData: {
    keys: Keys;
    enData: EnData<Identifier>;
};
export { data, encodedData };
