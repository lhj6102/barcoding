import RawBitArray from "./RawBitArray";

export default interface EnData<T> {
  identifier: T;
  sortable: {
    [key: string]: number[];
  };
  filterable: {
    [key: string]: RawBitArray;
  };
}
