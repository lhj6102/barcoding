import Filters from "../models/Filters";
import EncodedData from "../models/EncodedData";
export default function filterAndSortEncodedData<T>(encodedData: EncodedData<T>, sortGroup?: string | "", sortOption?: string | "", sortDirection?: "asc" | "desc", filters?: Filters): EncodedData<T>;
