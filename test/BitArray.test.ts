import BitArray from "../src/BitArray";

describe("BitArray test", () => {
  test("should set bit", () => {
    const bitArray = new BitArray(32);
    bitArray.setBit(0);
    expect(bitArray.getBit(0)).toBe(true);
  });

  test("should set bit all to 1", () => {
    const bitArray = new BitArray(64);
    bitArray.setAll(true);
    console.log(bitArray.getBitArray());
    for (let i = 0; i < 64; i++) {
      expect(bitArray.getBit(i)).toBe(true);
    }
    // expect(bitArray.getBit(0)).toBe(true);
    // expect(bitArray.getBit(31)).toBe(true);
  });
});
