"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitArray_1 = __importDefault(require("../src/BitArray"));
describe("BitArray test", () => {
    test("should set bit", () => {
        const bitArray = new BitArray_1.default(32);
        bitArray.setBit(0);
        expect(bitArray.getBit(0)).toBe(true);
    });
    test("should set bit all to 1", () => {
        const bitArray = new BitArray_1.default(64);
        bitArray.setAll(true);
        console.log(bitArray.getBitArray());
        for (let i = 0; i < 64; i++) {
            expect(bitArray.getBit(i)).toBe(true);
        }
        // expect(bitArray.getBit(0)).toBe(true);
        // expect(bitArray.getBit(31)).toBe(true);
    });
});
