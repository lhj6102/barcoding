export function myFunction(param: string): string {
  return `Hello, ${param}!`;
}

export function generateKeys(data: any) {
  const sortKey: any = {};
  const filterKey: any = {};
  for (const row of data) {
    const { sortable, filterable } = row;
    for (const key in sortable) {
      if (!sortKey[key]) {
        sortKey[key] = new Set();
      }
      for (const sortableKey in sortable[key]) {
        sortKey[key].add(sortableKey);
      }
    }
    for (const key in filterable) {
      if (!filterKey[key]) {
        filterKey[key] = new Set();
      }
      for (const value of filterable[key]) {
        filterKey[key].add(value);
      }
    }
  }
  // Change set to array

  for (const key in sortKey) {
    sortKey[key] = Array.from(sortKey[key]);
  }
  for (const key in filterKey) {
    filterKey[key] = Array.from(filterKey[key]);
  }

  return {
    sortKey,
    filterKey,
  };
}

export function encoder(keys: any) {}
