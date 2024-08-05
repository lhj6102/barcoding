import Barcoding from "../src";
import parseJSONFile from "./parseJSONFile";
import fs from "fs";
describe("should compare encoded data size", () => {
    test("should compare encoded data size", () => {
        const data = parseJSONFile("./___test___/json/genData100000.json");
        const dataBarcode = new Barcoding(data);
        const encodedData = dataBarcode.getEncodedData();
        const rawLength = JSON.stringify(data).length;
        const barcodeLength = JSON.stringify(dataBarcode.getEncodedData()).length;
        saveToJSON(encodedData, "encodedData100000");
    });
});
function saveToJSON(data, fileName) {
    fs.writeFileSync(`./___test___/json/${fileName}.json`, JSON.stringify(data));
}
