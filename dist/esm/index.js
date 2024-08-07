var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Barcoding_instances, _Barcoding_data, _Barcoding_isSet, _Barcoding_encodeData;
import { encodeData } from "./encode/encodeData";
import decodeRow from "./decode/decodeRow";
import filterAndSortEncodedData from "./encodedDataHandler/filterAndSortEncodedData";
import filterOptionCounter from "./encodedDataHandler/filterOptionCounter";
/**
 * Barcode generation and encoded data handling
 */
class Barcoding {
    constructor(inputData) {
        _Barcoding_instances.add(this);
        _Barcoding_data.set(this, void 0);
        _Barcoding_isSet.set(this, void 0);
        if (inputData) {
            __classPrivateFieldSet(this, _Barcoding_isSet, true, "f");
            // check if input data is already encoded
            const isEncoded = inputData.enData !== undefined;
            __classPrivateFieldSet(this, _Barcoding_data, isEncoded
                ? inputData
                : __classPrivateFieldGet(this, _Barcoding_instances, "m", _Barcoding_encodeData).call(this, inputData), "f");
        }
        else {
            __classPrivateFieldSet(this, _Barcoding_isSet, false, "f");
            __classPrivateFieldSet(this, _Barcoding_data, {
                keys: {
                    sortKey: {},
                    filterKey: {},
                },
                enData: [],
            }, "f");
        }
    }
    // setData
    setData(data) {
        __classPrivateFieldSet(this, _Barcoding_data, data, "f");
        __classPrivateFieldSet(this, _Barcoding_isSet, true, "f");
    }
    // setDataFromRawData
    setDataFromRawData(rawData) {
        __classPrivateFieldSet(this, _Barcoding_data, __classPrivateFieldGet(this, _Barcoding_instances, "m", _Barcoding_encodeData).call(this, rawData), "f");
        __classPrivateFieldSet(this, _Barcoding_isSet, true, "f");
    }
    getEncodedData() {
        if (!__classPrivateFieldGet(this, _Barcoding_isSet, "f")) {
            throw new Error("Data is not set");
        }
        return __classPrivateFieldGet(this, _Barcoding_data, "f");
    }
    // getKeys
    getKeys() {
        return __classPrivateFieldGet(this, _Barcoding_data, "f").keys;
    }
    filterAndSortData(sortGroup = "", sortOption = "", sortDirection = "desc", filters = {}) {
        return filterAndSortEncodedData(__classPrivateFieldGet(this, _Barcoding_data, "f"), sortGroup, sortOption, sortDirection, filters);
    }
    length() {
        return __classPrivateFieldGet(this, _Barcoding_data, "f").enData.length;
    }
    getFilterOptionCounts() {
        return filterOptionCounter(__classPrivateFieldGet(this, _Barcoding_data, "f"));
    }
    getFilterOptionRatios() {
        const filterOptionCounts = this.getFilterOptionCounts();
        const filterOptionRatios = {};
        for (const filterGroup in filterOptionCounts) {
            filterOptionRatios[filterGroup] = {};
            const totalCount = this.length();
            for (const filterOption in filterOptionCounts[filterGroup]) {
                const count = filterOptionCounts[filterGroup][filterOption];
                filterOptionRatios[filterGroup][filterOption] = count / totalCount;
            }
        }
        return filterOptionRatios;
    }
    decodeRow(index) {
        return decodeRow(__classPrivateFieldGet(this, _Barcoding_data, "f").enData[index], __classPrivateFieldGet(this, _Barcoding_data, "f").keys);
    }
    decodeRows(startIndex, endIndex) {
        const decodedRows = [];
        const maxIndex = Math.min(endIndex, this.length());
        for (let i = startIndex; i < maxIndex; i++) {
            decodedRows.push(this.decodeRow(i));
        }
        return decodedRows;
    }
}
_Barcoding_data = new WeakMap(), _Barcoding_isSet = new WeakMap(), _Barcoding_instances = new WeakSet(), _Barcoding_encodeData = function _Barcoding_encodeData(rawData) {
    return encodeData(rawData);
};
// export models
export { Barcoding, };
