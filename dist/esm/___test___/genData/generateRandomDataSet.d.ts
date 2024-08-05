import { RawDataRow } from "../../src/models/RawData";
interface Identifier {
    characterName: string;
    className: string;
    id: number;
}
export default function generateRandomDataSet(dataCount: number): RawDataRow<Identifier>[];
export declare function generateSortable(groupElement: {
    [groupName: string]: {
        maxCount: number;
        minCount?: number;
        possibleOptions: string[];
    };
}): RawDataRow<any>["sortable"];
export declare function generateFilterable(groupElement: {
    [groupName: string]: {
        maxCount: number;
        minCount?: number;
        possibleOptions: string[];
    };
}): RawDataRow<any>["filterable"];
export declare function randomInt(min: number, max: number): number;
export declare function sample<T>(array: T[], count: number): T[];
export {};
