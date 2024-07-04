// set interface of keys
export interface Key {
  [key: string]: string[];
}

export default interface Keys {
  sortKey: Key;
  filterKey: Key;
}
