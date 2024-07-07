import generateRandomSorcDataSet from "./generateRandomSorcDataSet";

describe("create gen data", () => {
  test("should create gen data", () => {
    generateRandomSorcDataSet(50000);
  });
});
