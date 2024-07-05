import genData2 from "./genData2.json";
import Barcoding from "../src";
import RawData from "../src/models/RawData";

type Identifier = {
  characterName: string;
  className: string;
  id: number;
};

describe("should encode data to barcode", () => {
  test("should encode data to barcode", () => {
    console.log(JSON.stringify(genData2));
    const data: RawData<Identifier> = genData2;
    const genData2Barcode = new Barcoding<Identifier>(data);
    // console.log(genData2Barcode.getKeys());
  });
});
