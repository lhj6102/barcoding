"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../src"));
const parseJSONFile_1 = __importDefault(require("./parseJSONFile"));
const fs_1 = __importDefault(require("fs"));
describe("should compare encoded data size", () => {
    test("should compare encoded data size", () => {
        const data = (0, parseJSONFile_1.default)("./___test___/json/genData100000.json");
        const dataBarcode = new src_1.default(data);
        const encodedData = dataBarcode.getEncodedData();
        const rawLength = JSON.stringify(data).length;
        const barcodeLength = JSON.stringify(dataBarcode.getEncodedData()).length;
        saveToJSON(encodedData, "encodedData100000");
    });
});
function saveToJSON(data, fileName) {
    fs_1.default.writeFileSync(`./___test___/json/${fileName}.json`, JSON.stringify(data));
}
