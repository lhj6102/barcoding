"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeData = encodeData;
const encodeDataWithKeys_1 = require("./encodeDataWithKeys");
const generateKeys_1 = require("./generateKeys");
function encodeData(data) {
    const keys = (0, generateKeys_1.generateKeys)(data);
    return { keys, enData: (0, encodeDataWithKeys_1.encodeDataWithKeys)(keys, data) };
}
