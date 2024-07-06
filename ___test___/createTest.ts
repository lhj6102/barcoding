import genData100000 from "./genData100000.json";
import Barcoding from "../src";
import RawData from "../src/models/RawData";
import fs from "fs";

type Identifier = {
  characterName: string;
  className: string;
  id: number;
};

function createData() {
  const data100000 = genData100000 as RawData<Identifier>;
  const data100000Barcode = new Barcoding<Identifier>(data100000);
  const encodedData = data100000Barcode.getEncodedData();
  const rawLength = JSON.stringify(data100000).length;
  const barcodeLength = JSON.stringify(
    data100000Barcode.getEncodedData()
  ).length;
  saveToJSON(encodedData, "encodedData100000");
}

function saveToJSON(data: any, fileName: string) {
  fs.writeFileSync(`./___test___/${fileName}.json`, JSON.stringify(data));
}

createData();
