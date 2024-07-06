import Barcoding from "../src";
import RawData from "../src/models/RawData";
import parseJSONFile from "./parseJSONFile";

type Identifier = {
  characterName: string;
  className: string;
  id: number;
};

describe("should compare encoded data size", () => {
  test("should compare encoded data size", () => {
    const data = parseJSONFile<RawData<Identifier>>(
      "./___test___/genData50000.json"
    );
    const dataBarcode = new Barcoding<Identifier>(data);
    const encodedData = dataBarcode.getEncodedData();
    const rawLength = JSON.stringify(data).length;
    const barcodeLength = JSON.stringify(dataBarcode.getEncodedData()).length;
    // saveToJSON(encodedData, "encodedData");
  });
});
