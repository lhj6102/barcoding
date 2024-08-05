"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseJSONFile;
const fs_1 = __importDefault(require("fs"));
function parseJSONFile(fileName) {
    return JSON.parse(fs_1.default.readFileSync(fileName, "utf8"));
}
