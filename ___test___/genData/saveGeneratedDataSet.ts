import fs from "fs";
import generateRandomDataSet from "./generateRandomDataSet";

export default function saveGeneratedDataSet(count: number, fileName: string) {
  // generate random data
  // save to genData.ts (which exports data by default in es6 module format)
  const data = generateRandomDataSet(count);
  const dataString = `${JSON.stringify(data)}`;
  fs.writeFileSync(`___test___/${fileName}.json`, dataString);
  console.log(`Generated data saved to ___test___/${fileName}.json`);
}
