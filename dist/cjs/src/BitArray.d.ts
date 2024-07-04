import RawBitArray from "./models/RawBitArray";
export default class BitArray {
    private bitArray;
    private totalBits;
    private arraySize;
    constructor(totalBits: number, bitArray?: number[]);
    /**
     * OR operator for two raw bit arrays
     * Does not check for array length equality to lower overhead
     */
    static bitArrayOr(bitArray1: RawBitArray, bitArray2: RawBitArray): RawBitArray;
    /**
     * AND operator for two raw bit arrays
     * Does not check for array length equality to lower overhead
     */
    static bitArrayAnd(bitArray1: RawBitArray, bitArray2: RawBitArray): RawBitArray;
    /**
     * Equality check for two raw bit arrays
     * Does not check for array length equality to lower overhead. Only use bitArray1 elements as reference.
     */
    static bitArrayEqual(bitArray1: RawBitArray, bitArray2: RawBitArray): boolean;
    setBit(index: number, value?: boolean | number): void;
    getBit(index: number): boolean;
    getBitArray(): number[];
    toJSON(): string;
    fromJSON(json: string): void;
    setAll(bool: boolean): void;
    or(other: BitArray): BitArray;
    and(other: BitArray): BitArray;
}
