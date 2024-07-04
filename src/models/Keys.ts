// set interface of keys
export interface Key<T = string[]> {
  [key: string]: T;
}

export default interface Keys {
  sortKey: Key;
  filterKey: Key;
}
