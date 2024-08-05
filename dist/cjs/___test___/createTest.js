"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genData1000_json_1 = __importDefault(require("./json/genData1000.json"));
const src_1 = __importDefault(require("../src"));
const fs_1 = __importDefault(require("fs"));
function createData() {
    const data100000 = genData1000_json_1.default;
    const data100000Barcode = new src_1.default(data100000);
    const encodedData = data100000Barcode.getEncodedData();
    const rawLength = JSON.stringify(data100000).length;
    const barcodeLength = JSON.stringify(data100000Barcode.getEncodedData()).length;
    saveToJSON(encodedData, "encodedData100000");
}
function saveToJSON(data, fileName) {
    fs_1.default.writeFileSync(`./___test___/${fileName}.json`, JSON.stringify(data));
}
createData();
