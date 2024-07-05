import genData1000 from "./genData1000.json";

import Barcoding from "../src";

describe("should encode data to barcode", () => {
  test("should encode data to barcode", () => {
    const genData1000Barcode = new Barcoding(genData1000);
    console.log(genData1000Barcode.getKeys());
  });
});
