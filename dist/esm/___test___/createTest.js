import genData1000 from "./json/genData1000.json";
import Barcoding from "../src";
import fs from "fs";
function createData() {
    const data100000 = genData1000;
    const data100000Barcode = new Barcoding(data100000);
    const encodedData = data100000Barcode.getEncodedData();
    const rawLength = JSON.stringify(data100000).length;
    const barcodeLength = JSON.stringify(data100000Barcode.getEncodedData()).length;
    saveToJSON(encodedData, "encodedData100000");
}
function saveToJSON(data, fileName) {
    fs.writeFileSync(`./___test___/${fileName}.json`, JSON.stringify(data));
}
createData();
