"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = exports.data = void 0;
const data = [
    {
        characterName: "푸딩몰래먹은사람",
        className: "소서리스",
        id: 4,
        sortable: {
            skillDPS: {
                "종말의 날": 15000000,
                천벌: 10000000,
                익스플로전: 11000000,
            },
            skillDamage: {
                "종말의 날": 11000000,
                "종말의 날 - 마력 해방": 19000000,
                천벌: 9000000,
                익스플로전: 21000000,
                버스트: 300000000,
            },
            buff: {},
        },
        filterable: {
            engravings: ["원한", "저주받은 인형", "버스트"],
            selectedSkills: ["종말의 날", "천벌", "익스플로전", "애로우 해일"],
            tierSets: ["2악4지"],
            stats: ["특치"],
        },
    },
    {
        characterName: "주다영",
        className: "바드",
        id: 5,
        sortable: {
            skillDPS: {},
            skillDamage: {},
            buff: {
                상시: 1.66,
                순간: 2.01,
            },
        },
        filterable: {
            engravings: ["중갑 착용"],
            selectedSkills: ["천상의 연주"],
            tierSets: ["6갈망"],
            stats: ["신특"],
        },
    },
];
exports.data = data;
// output
const sortKey = {
    skillDPS: ["종말의 날", "천벌", "익스플로전"],
    skillDamage: [
        "종말의 날",
        "종말의 날 - 마력 해방",
        "천벌",
        "익스플로전",
        "버스트",
    ],
    buff: ["상시", "순간"],
};
const filterKey = {
    engravings: ["원한", "저주받은 인형", "버스트", "중갑 착용"],
    selectedSkills: [
        "종말의 날",
        "천벌",
        "익스플로전",
        "애로우 해일",
        "천상의 연주",
    ],
    tierSets: ["2악4지", "6갈망"],
    stats: ["특치", "신특"],
};
const keys = {
    sortKey,
    filterKey,
};
const encodedData = [
    {
        identifier: {
            characterName: "푸딩몰래먹은사람",
            className: "소서리스",
            id: 4,
        },
        sortable: {
            skillDPS: [15000000, 10000000, 11000000],
            skillDamage: [11000000, 19000000, 9000000, 21000000, 300000000],
        },
        filterable: {
            // binary encoded
            engravings: "1110", // 원o 저o 버x 중x
            selectedSkills: "11110", // 종o 천o 익o 애o 천x
            tierSets: "10", // 2악4지o 6갈망x
            stats: "10", // 특치o 신특x
        },
    },
    {
        identifier: {
            characterName: "주다영",
            className: "바드",
            id: 5,
        },
        sortable: {
            skillDPS: [0, 0, 0], // no data => 0
            skillDamage: [0, 0, 0, 0, 0], // no data => 0
        },
        filterable: {
            engravings: "0001", // 원x 저x 버x 중o
            selectedSkills: "00001", // 종x 천x 익x 애x 천o
            tierSets: "01", // 2악4지x 6갈망o
            stats: "01", // 특치x 신특o
        },
    },
];
const output = {
    keys,
    encodedData,
};
exports.output = output;
