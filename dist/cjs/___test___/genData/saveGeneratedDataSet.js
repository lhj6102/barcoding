"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = saveGeneratedDataSet;
const fs_1 = __importDefault(require("fs"));
const generateRandomDataSet_1 = __importDefault(require("./generateRandomDataSet"));
function saveGeneratedDataSet(count, fileName) {
    // generate random data
    // save to genData.ts (which exports data by default in es6 module format)
    const data = (0, generateRandomDataSet_1.default)(count);
    const dataString = `${JSON.stringify(data)}`;
    fs_1.default.writeFileSync(`___test___/${fileName}.json`, dataString);
    console.log(`Generated data saved to ___test___/${fileName}.json`);
}
