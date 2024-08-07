export default interface RawData<T> extends Array<RawDataRow<T>> {
}
export interface RawDataRow<T> {
    identifier: T;
    sortable: {
        [key: string]: {
            [key: string]: number | undefined;
        };
    };
    filterable: {
        [key: string]: string[] | [];
    };
}
