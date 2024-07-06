import fs from "fs";

export default function parseJSONFile<T>(fileName: string): T {
  return JSON.parse(fs.readFileSync(fileName, "utf8"));
}
