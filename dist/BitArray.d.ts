export default class BitArray {
    private bitArray;
    private totalBits;
    private arraySize;
    constructor(totalBits: number, bitArray?: number[]);
    setBit(index: number): void;
    getBit(index: number): boolean;
    getBitArray(): number[];
    toJSON(): string;
    fromJSON(json: string): void;
    or(other: BitArray): BitArray;
    and(other: BitArray): BitArray;
}
