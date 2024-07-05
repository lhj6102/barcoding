import fs from "fs";
import generateRandomDataSet from "./generateRandomDataSet";

export default function saveGeneratedDataSet(count: number) {
  // generate random data
  // save to genData.ts (which exports data by default in es6 module format)
  const data = generateRandomDataSet(count);
  const dataString = `${JSON.stringify(data)}`;
  const fileName = `genData${count}.json`;
  fs.writeFileSync(`___test___/${fileName}`, dataString);
  console.log(`Generated data saved to ___test___/${fileName}`);
}
