export default class BitArray {
  private bitArray: number[];
  private totalBits: number;
  private arraySize: number;

  constructor(totalBits: number, bitArray?: number[]) {
    this.totalBits = totalBits;
    this.arraySize = Math.ceil(totalBits / 32);
    this.bitArray = bitArray || new Array(this.arraySize).fill(0);
  }

  setBit(index: number): void {
    if (index >= this.totalBits || index < 0) {
      throw new Error(
        `Index ${index} is out of bounds for totalBits ${this.totalBits}`
      );
    }
    const arrayIndex = Math.floor(index / 32);
    const bitPosition = index % 32;
    this.bitArray[arrayIndex] |= 1 << bitPosition;
  }

  getBit(index: number): boolean {
    if (index >= this.totalBits || index < 0) {
      throw new Error(
        `Index ${index} is out of bounds for totalBits ${this.totalBits}`
      );
    }
    const arrayIndex = Math.floor(index / 32);
    const bitPosition = index % 32;
    return (this.bitArray[arrayIndex] & (1 << bitPosition)) !== 0;
  }

  getBitArray(): number[] {
    return this.bitArray;
  }

  toJSON(): string {
    return JSON.stringify(this.bitArray);
  }

  fromJSON(json: string): void {
    this.bitArray = JSON.parse(json);
  }

  // OR 연산
  or(other: BitArray): BitArray {
    if (this.totalBits !== other.totalBits) {
      throw new Error("BitArrays must be of the same length for OR operation");
    }
    const result = new BitArray(this.totalBits);
    for (let i = 0; i < this.arraySize; i++) {
      result.bitArray[i] = this.bitArray[i] | other.bitArray[i];
    }
    return result;
  }

  // AND 연산
  and(other: BitArray): BitArray {
    if (this.totalBits !== other.totalBits) {
      throw new Error("BitArrays must be of the same length for AND operation");
    }
    const result = new BitArray(this.totalBits);
    for (let i = 0; i < this.arraySize; i++) {
      result.bitArray[i] = this.bitArray[i] & other.bitArray[i];
    }
    return result;
  }
}

// 사용 예시
// const totalBits = 100;
// const indices1 = [0, 31, 32, 99];
// const indices2 = [1, 31, 33, 98];

// const bitArray1 = new BitArray(totalBits);
// indices1.forEach((index) => bitArray1.setBit(index));

// const bitArray2 = new BitArray(totalBits);
// indices2.forEach((index) => bitArray2.setBit(index));

// const orResult = bitArray1.or(bitArray2);
// const andResult = bitArray1.and(bitArray2);

// console.log(`BitArray 1: ${bitArray1.toJSON()}`);
// console.log(`BitArray 2: ${bitArray2.toJSON()}`);
// console.log(`OR Result: ${orResult.toJSON()}`);
// console.log(`AND Result: ${andResult.toJSON()}`);
