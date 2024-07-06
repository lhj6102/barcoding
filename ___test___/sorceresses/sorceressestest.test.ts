import parseJSONFile from "../parseJSONFile";
import Barcoding from "../../src";
import RawData from "../../src/models/RawData";

type Identifier = {
  className: string;
  characterName: string;
};

describe("encode sorceresses", () => {
  test("encode sorceresses", () => {
    const sorceresses = parseJSONFile(
      "./___test___/sorceresses/sorceresses.json"
    ) as RawData<Identifier>;
    const barcoding = new Barcoding<Identifier>(sorceresses);
    const encodedData = barcoding.getEncodedData();
    console.log(barcoding.getFilterOptionRatios());
  });
});
