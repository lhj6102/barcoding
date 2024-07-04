import { Key } from "../models/Keys";

export function getGetIndexFunction(
  key: Key
): (groupName: string, value: string) => number {
  // key: {groupA: [a1, a2, a3], groupB: [b1, b2]}
  // return (groupName, value) => index
  // Using hash map for O(1) lookup
  const indexMap: any = {};
  for (const groupName in key) {
    indexMap[groupName] = {};
    for (let i = 0; i < key[groupName].length; i++) {
      indexMap[groupName][key[groupName][i]] = i;
    }
  }
  return (groupName: string, value: string): number =>
    indexMap[groupName][value] ?? -1;
}
