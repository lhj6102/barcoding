import fs from "fs";
export default function parseJSONFile(fileName) {
    return JSON.parse(fs.readFileSync(fileName, "utf8"));
}
