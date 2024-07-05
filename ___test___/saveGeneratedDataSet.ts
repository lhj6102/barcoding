import fs from "fs";
import generateRandomDataSet from "./generateRandomDataSet";

// generate random data
// save to genData.ts (which exports data by default in es6 module format)
const data = generateRandomDataSet(10000);
const dataString = `export default ${JSON.stringify(data)}`;
fs.writeFileSync("___test___/genData.ts", dataString);
console.log("Generated data saved to ___test___/genData.ts");
