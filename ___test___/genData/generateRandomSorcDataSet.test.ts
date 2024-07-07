import saveGeneratedDataSet from "./saveGeneratedDataSet";

describe("create gen data", () => {
  test("should create gen data", () => {
    saveGeneratedDataSet(100000, "sorceressGen100000");
  });
});
