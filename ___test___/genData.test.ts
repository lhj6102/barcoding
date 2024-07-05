import genData10 from "./genData10.json";
import Barcoding from "../src";

describe("should encode data to barcode", () => {
  test("should encode data to barcode", () => {
    console.log(genData10);
    const genData10Barcode = new Barcoding<any>(genData10);
    // console.log(genData10Barcode.getKeys());
  });
});
