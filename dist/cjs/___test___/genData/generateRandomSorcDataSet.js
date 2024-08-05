"use strict";
/*
[
  {
    sortable: {
      buff: {
        상시: 0,
        순간: 0,
      },
      info: {
        itemLevel: 1623.33,
        combatLevel: 60,
      },
      skillDPS: {
        돌풍: 275769,
        천벌: 1112265,
        블레이즈: 619106,
        인페르노: 641685,
        "마력 방출": 0,
        "종말의 날": 1533878,
        익스플로전: 1126691,
        "숭고한 해일": 1188279,
        "종말의 부름": 16515,
        "혹한의 부름": 290610,
        "돌풍 - 마력 해방": 897288,
        "엔비스카의 권능": 175879,
        "천벌 - 마력 해방": 4487628,
        "블레이즈 - 마력 해방": 2014430,
        "인페르노 - 마력 해방": 2087896,
        "종말의 날 - 마력 해방": 6083220,
        "익스플로전 - 마력 해방": 4469228,
        "숭고한 해일 - 마력 해방": 3866386,
      },
      skillDamage: {
        돌풍: 2412980,
        천벌: 30275876,
        블레이즈: 5175733,
        인페르노: 7507722,
        "마력 방출": 586082,
        "종말의 날": 36675033,
        익스플로전: 30668531,
        "숭고한 해일": 11918446,
        "종말의 부름": 4816421,
        "혹한의 부름": 5559380,
        "돌풍 - 마력 해방": 7851275,
        "엔비스카의 권능": 51291841,
        "천벌 - 마력 해방": 122153237,
        "블레이즈 - 마력 해방": 16840641,
        "인페르노 - 마력 해방": 24428385,
        "종말의 날 - 마력 해방": 145449803,
        "익스플로전 - 마력 해방": 121652393,
        "숭고한 해일 - 마력 해방": 38779858,
      },
    },
    filterable: {
      elixir: [
        "무기 공격력",
        "달인 (질서)",
        "지능",
        "공격력",
        "치명타 피해",
        "무력화",
        "달인 (혼돈)",
        "보스 피해",
      ],
      tierSets: ["악몽6"],
      attackGems: [
        "천벌",
        "인페르노",
        "종말의 날",
        "익스플로전",
        "숭고한 해일",
        "블레이즈",
      ],
      engravings: [
        "원한",
        "점화",
        "타격의 대가",
        "아드레날린",
        "속전속결",
        "에테르 포식자",
      ],
      cardOptions: ["세상을 구하는 빛 6세트 (30각성합계)"],
      cooldownGems: [
        "혹한의 부름",
        "종말의 날",
        "블레이즈",
        "숭고한 해일",
        "인페르노",
      ],
      secondaryStats: ["특치"],
      selectedSkills: [
        "블레이즈",
        "혹한의 부름",
        "돌풍",
        "숭고한 해일",
        "인페르노",
        "천벌",
        "익스플로전",
        "종말의 날",
      ],
      braceletOptions: ["열정", "순환", "특화", "신속"],
    },
    identifier: {
      className: "소서리스",
      characterName: "푸딩몰래먹은사람",
    },
  },
  {
    sortable: {
      buff: {
        상시: 0,
        순간: 0,
      },
      info: {
        itemLevel: 1550,
        combatLevel: 60,
      },
      skillDPS: {
        돌풍: 67403,
        천벌: 377490,
        블레이즈: 278411,
        인페르노: 180338,
        "마력 방출": 0,
        "종말의 날": 429831,
        익스플로전: 347456,
        "숭고한 해일": 73639,
        "종말의 부름": 8131,
        "혹한의 부름": 188223,
        "아이스 애로우": 229786,
        "돌풍 - 마력 해방": 216707,
        "엔비스카의 권능": 86599,
        "천벌 - 마력 해방": 1504931,
        "블레이즈 - 마력 해방": 895109,
        "인페르노 - 마력 해방": 579799,
        "종말의 날 - 마력 해방": 1671128,
        "익스플로전 - 마력 해방": 1376457,
        "숭고한 해일 - 마력 해방": 236756,
        "아이스 애로우 - 마력 해방": 738776,
      },
      skillDamage: {
        돌풍: 534512,
        천벌: 9312679,
        블레이즈: 2452801,
        인페르노: 2223572,
        "마력 방출": 263732,
        "종말의 날": 11360457,
        익스플로전: 8571747,
        "숭고한 해일": 1167926,
        "종말의 부름": 2149337,
        "혹한의 부름": 3980925,
        "아이스 애로우": 4453254,
        "돌풍 - 마력 해방": 1718492,
        "엔비스카의 권능": 22889085,
        "천벌 - 마력 해방": 37126661,
        "블레이즈 - 마력 해방": 7885913,
        "인페르노 - 마력 해방": 7148925,
        "종말의 날 - 마력 해방": 44167924,
        "익스플로전 - 마력 해방": 33957210,
        "숭고한 해일 - 마력 해방": 3754953,
        "아이스 애로우 - 마력 해방": 14317495,
      },
    },
    filterable: {
      elixir: [],
      tierSets: ["환각6"],
      attackGems: [],
      engravings: ["원한", "점화", "타격의 대가", "아드레날린", "속전속결"],
      cardOptions: ["세상을 구하는 빛 6세트 (30각성합계)"],
      cooldownGems: [],
      secondaryStats: ["특신"],
      selectedSkills: [
        "블레이즈",
        "혹한의 부름",
        "돌풍",
        "숭고한 해일",
        "인페르노",
        "천벌",
        "아이스 애로우",
        "익스플로전",
        "종말의 날",
      ],
      braceletOptions: ["치명", "특화", "지능"],
    },
    identifier: {
      className: "소서리스",
      characterName: "아장아장해랑",
    },
  },
];
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateRandomSorcDataSet;
const fs_1 = __importDefault(require("fs"));
const generateRandomDataSet_1 = require("./generateRandomDataSet");
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
    };
    const sortable = (0, generateRandomDataSet_1.generateSortable)({
        skillDPS: {
            minCount: 8,
            maxCount: 16,
            possibleOptions: sorceressSkills,
        },
        skillDamage: {
            minCount: 8,
            maxCount: 16,
            possibleOptions: sorceressSkills,
        },
        buff: {
            maxCount: 0,
            possibleOptions: [],
        },
        info: {
            minCount: 3,
            maxCount: 3,
            possibleOptions: ["itemLevel", "combatLevel", "buildLevel"],
        },
    });
    const filterable = (0, generateRandomDataSet_1.generateFilterable)({
        elixir: {
            maxCount: 8,
            possibleOptions: [
                "무기 공격력",
                "달인 (질서)",
                "지능",
                "공격력",
                "치명타 피해",
                "무력화",
                "달인 (혼돈)",
                "보스 피해",
            ],
        },
        tierSets: {
            minCount: 1,
            maxCount: 1,
            possibleOptions: tierSets,
        },
        attackGems: {
            maxCount: 6,
            possibleOptions: sorceressSkillSelections,
        },
        cooldownGems: {
            maxCount: 5,
            possibleOptions: sorceressSkillSelections,
        },
        engravings: {
            minCount: 4,
            maxCount: 5,
            possibleOptions: engravings,
        },
        selectedSkills: {
            minCount: 8,
            maxCount: 8,
            possibleOptions: sorceressSkillSelections,
        },
        braceletOptions: {
            maxCount: 4,
            possibleOptions: ["열정", "순환", "특화", "신속", "망치", "쐐기", "치명"],
        },
        cardOptions: {
            maxCount: 1,
            possibleOptions: [
                "세상을 구하는 빛 6세트 (30각성합계)",
                "카제로스의 군단장 6세트 (30각성합계)",
            ],
        },
        secondaryStats: {
            minCount: 0,
            maxCount: 1,
            possibleOptions: stats,
        },
        stats: {
            minCount: 1,
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
function generateRandomSorcDataSet(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(generateRandomRow(i));
    }
    saveFile(`genSorceress${count}`, JSON.stringify(data));
}
function saveFile(fileName, data) {
    fs_1.default.writeFileSync(`___test___/json/${fileName}.json`, data);
}
