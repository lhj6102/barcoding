// Raw data for encoding
export default interface RawData {
  identifier: {
    [key: string]: object;
  };
  sortable: {
    [key: string]: object;
  };
  filterable: {
    [key: string]: string[];
  };
}
