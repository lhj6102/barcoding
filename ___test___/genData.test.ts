import genData2 from "./genData2.json";
import genData1000 from "./genData1000.json";
import genData10000 from "./genData10000.json";
// import genData100000 from "./genData100000.json";
import Barcoding from "../src";
import RawData from "../src/models/RawData";

type Identifier = {
  characterName: string;
  className: string;
  id: number;
};

describe("should encode data to barcode", () => {
  test("should encode data to barcode", () => {
    console.log(JSON.stringify(genData2));
    const data: RawData<Identifier> = genData2;
    const genData2Barcode = new Barcoding<Identifier>(data);
    console.log(genData2Barcode.getKeys());
  });
});

describe("should compare data 1000 and 10000", () => {
  test("should compare data 1000 and 10000 keys", () => {
    const data1000 = genData1000 as RawData<Identifier>;
    const data10000 = genData10000 as RawData<Identifier>;
    const data1000Barcode = new Barcoding<Identifier>(data1000);
    const data10000Barcode = new Barcoding<Identifier>(data10000);
    const keys1000 = data1000Barcode.getKeys();
    const keys10000 = data10000Barcode.getKeys();
    compareSortKey(keys1000.sortKey, keys10000.sortKey);

    function compareSortKey(
      sortKey1: { [groupName: string]: string[] },
      sortKey2: { [groupName: string]: string[] }
    ) {
      // compare groupNames
      expect(Object.keys(sortKey1).sort()).toEqual(
        Object.keys(sortKey2).sort()
      );
      // compare options
      for (const groupName in sortKey1) {
        expect(sortKey1[groupName].sort()).toEqual(sortKey2[groupName].sort());
      }
    }
  });
});

describe("should compare encoded data size", () => {
  test("should compare encoded data size", () => {
    const data10000 = genData10000 as RawData<Identifier>;
    const data10000Barcode = new Barcoding<Identifier>(data10000);

    const rawLength = JSON.stringify(data10000).length;
    const barcodeLength = JSON.stringify(
      data10000Barcode.getEncodedData()
    ).length;
    console.log("🚀 ~ test ~ rawLength:", rawLength);
    console.log("🚀 ~ test ~ barcodeLength:", barcodeLength);
  });
});
