export default interface Filters {
  [key: string]: {
    includes?: string[];
    excludes?: string[];
  };
}
