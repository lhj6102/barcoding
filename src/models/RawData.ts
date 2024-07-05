// Raw data for encoding
export default interface RawData<T> extends Array<RawDataRow<T>> {}

export interface RawDataRow<T> {
  identifier: T;
  sortable: {
    [key: string]:
      | {
          [key: string]: number;
        }
      | {};
  };
  filterable: {
    [key: string]: string[];
  };
}
