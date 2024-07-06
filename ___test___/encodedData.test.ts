// import encodedData50000 from "./json/encodedData50000.json";
import EncodedData from "../src/models/EncodedData";
import Barcoding from "../src";
import fs from "fs";
import parseJSONFile from "./parseJSONFile";

type Identifier = {
  characterName: string;
  className: string;
  id: number;
};

describe("should use encoded data", () => {
  const data = parseJSONFile<EncodedData<Identifier>>(
    "./___test___/json/encodedData50000.json"
  );
  const dataBarcode = new Barcoding<Identifier>(data);
  test("should construct encoded data", () => {
    const encodedData = dataBarcode.getEncodedData();
  });

  test("should sort data", () => {
    // sort by skillDPS: 천벌
    const sortGroup = "skillDPS";
    const sortOption = "천벌";
    const sortedData = new Barcoding<Identifier>(
      dataBarcode.filterAndSortData(sortGroup, sortOption, "desc", {})
    );
    for (let i = 0; i < 10; i++) {
      console.log(sortedData.decodeRow(i).sortable.skillDPS);
    }
  });

  test("should filter data", () => {
    const keys = dataBarcode.getKeys();
    const filteredData = new Barcoding<Identifier>(
      dataBarcode.filterAndSortData("", "", "desc", {
        engravings: {
          includes: ["점화"],
          excludes: ["환류"],
        },
        tierSets: {
          includes: ["6악몽"],
        },
      })
    );
  });

  test("should filter and sort data", () => {
    const keys = dataBarcode.getKeys();
    const filteredData = new Barcoding<Identifier>(
      dataBarcode.filterAndSortData("skillDPS", "천벌", "desc", {
        engravings: {
          includes: ["점화"],
          excludes: ["환류"],
        },
        tierSets: {
          includes: ["6악몽"],
        },
      })
    );
    for (let i = 0; i < 10; i++) {
      console.log(filteredData.decodeRow(i));
    }
  });
});
