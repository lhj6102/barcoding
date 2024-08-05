"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filterAndSortEncodedData;
const filterData_1 = __importStar(require("./filterData"));
// sort & filter & ratio
function filterAndSortEncodedData(encodedData, sortGroup = "", sortOption = "", sortDirection = "desc", filters = {}) {
    const doSort = sortGroup.length > 0 || sortOption.length > 0;
    const { keys, enData } = encodedData;
    // Validate filters parameters
    (0, filterData_1.validateFilters)(filters, keys);
    // Validate sortGroup and sortOption
    if (doSort &&
        !(keys.sortKey[sortGroup] && keys.sortKey[sortGroup].includes(sortOption))) {
        throw new Error(`Invalid sort option: ${sortGroup} => ${sortOption}`);
    }
    // Filter data
    const filteredEnData = (0, filterData_1.default)(enData, filters, keys.filterKey);
    // Sort data
    if (doSort) {
        const optionIndex = keys.sortKey[sortGroup].indexOf(sortOption);
        filteredEnData.sort((a, b) => {
            if (sortDirection === "asc") {
                return (a.sortable[sortGroup][optionIndex] -
                    b.sortable[sortGroup][optionIndex]);
            }
            else {
                return (b.sortable[sortGroup][optionIndex] -
                    a.sortable[sortGroup][optionIndex]);
            }
        });
    }
    return { keys, enData: filteredEnData };
}
