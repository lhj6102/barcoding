"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateRandomDataSet;
exports.generateSortable = generateSortable;
exports.generateFilterable = generateFilterable;
exports.randomInt = randomInt;
exports.sample = sample;
function generateRandomDataSet(dataCount) {
    // make dataset with random data
    const data = [];
    for (let i = 0; i < dataCount; i++) {
        data.push(generateRandomRow(i));
    }
    return data;
}
// ex
/*
[
  {
    identifier: {
      characterName: "푸딩몰래먹은사람",
      className: "소서리스",
      id: 4,
    },
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
    identifier: {
      characterName: "주다영",
      className: "바드",
      id: 5,
    },
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
 */
function generateRandomRow(id) {
    // random data format
    const sorceressSkills = [
        "종말의 날 - 마력 해방",
        "천벌 - 마력 해방",
        "익스플로전 - 마력 해방",
        "엔비스카의 권능",
        "숭고한 해일 - 마력 해방",
        "종말의 날",
        "익스플로전",
        "천벌",
        "인페르노 - 마력 해방",
        "블레이즈 - 마력 해방",
        "숭고한 해일",
        "돌풍 - 마력 해방",
        "인페르노",
        "혹한의 부름",
        "블레이즈",
        "종말의 부름",
        "돌풍",
        "마력 방출",
    ];
    const engravings = [
        "원한",
        "예리한 둔기",
        "아드레날린",
        "저주받은 인형",
        "슈퍼 차지",
        "결투의 대가",
        "기습의 대가",
        "돌격대장",
        "바리케이드",
        "속전속결",
        "정기 흡수",
        "정밀 단도",
        "질량 증가",
        "타격의 대가",
        "에테르 포식자",
        "안정된 상태",
        "불굴",
        "선수필승",
        "달인의 저력",
        "각성",
        "약자 무시",
        "시선 집중",
        "점화",
        "환류",
    ];
    const sorceressSkillSelections = [
        "종말의 날",
        "익스플로전",
        "천벌",
        "숭고한 해일",
        "인페르노",
        "혹한의 부름",
        "블레이즈",
        "돌풍",
    ];
    const tierSets = ["2악4지", "6악몽", "6환각", "6구원", "6갈망", "6지배"];
    const stats = ["특치", "치특", "치특신", "특신", "신특"];
    const identifier = {
        // random name,
        characterName: `${id}이름`,
        className: "소서리스",
        id,
    };
    const sortable = generateSortable({
        skillDPS: {
            maxCount: 16,
            possibleOptions: sorceressSkills,
        },
        skillDamage: {
            maxCount: 16,
            possibleOptions: sorceressSkills,
        },
        buff: {
            maxCount: 0,
            possibleOptions: [],
        },
    });
    const filterable = generateFilterable({
        engravings: {
            maxCount: 5,
            possibleOptions: engravings,
        },
        selectedSkills: {
            maxCount: 8,
            possibleOptions: sorceressSkillSelections,
        },
        tierSets: {
            maxCount: 1,
            possibleOptions: tierSets,
        },
        stats: {
            maxCount: 1,
            possibleOptions: stats,
        },
    });
    return {
        identifier,
        sortable,
        filterable,
    };
}
function generateSortable(groupElement) {
    var _a;
    const sortable = {};
    for (const groupName in groupElement) {
        // 요소 n개 중 (0개~10개)를 선택해서 랜덤 값을 넣는다.
        const possibleOptions = groupElement[groupName].possibleOptions;
        const optionCount = randomInt((_a = groupElement[groupName].minCount) !== null && _a !== void 0 ? _a : 0, Math.min(possibleOptions.length, groupElement[groupName].maxCount));
        const selectedOptions = sample(possibleOptions, optionCount);
        const group = {};
        for (const option of selectedOptions) {
            group[option] = randomInt(0, 200000000);
        }
        sortable[groupName] = group;
    }
    return sortable;
}
function generateFilterable(groupElement) {
    var _a;
    const filterable = {};
    for (const groupName in groupElement) {
        // 요소 n개 중 (0개~5개)를 선택해서 넣는다.
        const possibleOptions = groupElement[groupName].possibleOptions;
        const optionCount = randomInt((_a = groupElement[groupName].minCount) !== null && _a !== void 0 ? _a : 0, Math.min(possibleOptions.length, groupElement[groupName].maxCount));
        const selectedOptions = sample(possibleOptions, optionCount);
        filterable[groupName] = selectedOptions;
    }
    return filterable;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function sample(array, count) {
    // Get count(n) random elements from array without duplication
    const result = [];
    const copy = array.slice();
    for (let i = 0; i < count; i++) {
        if (copy.length === 0) {
            break;
        }
        const randomIndex = randomInt(0, copy.length - 1);
        result.push(copy.splice(randomIndex, 1)[0]);
    }
    return result;
}
