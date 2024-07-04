declare const data: ({
    characterName: string;
    className: string;
    id: number;
    sortable: {
        skillDPS: {
            "\uC885\uB9D0\uC758 \uB0A0": number;
            천벌: number;
            익스플로전: number;
        };
        skillDamage: {
            "\uC885\uB9D0\uC758 \uB0A0": number;
            "\uC885\uB9D0\uC758 \uB0A0 - \uB9C8\uB825 \uD574\uBC29": number;
            천벌: number;
            익스플로전: number;
            버스트: number;
        };
        buff: {
            상시?: undefined;
            순간?: undefined;
        };
    };
    filterable: {
        engravings: string[];
        selectedSkills: string[];
        tierSets: string[];
        stats: string[];
    };
} | {
    characterName: string;
    className: string;
    id: number;
    sortable: {
        skillDPS: {
            "\uC885\uB9D0\uC758 \uB0A0"?: undefined;
            천벌?: undefined;
            익스플로전?: undefined;
        };
        skillDamage: {
            "\uC885\uB9D0\uC758 \uB0A0"?: undefined;
            "\uC885\uB9D0\uC758 \uB0A0 - \uB9C8\uB825 \uD574\uBC29"?: undefined;
            천벌?: undefined;
            익스플로전?: undefined;
            버스트?: undefined;
        };
        buff: {
            상시: number;
            순간: number;
        };
    };
    filterable: {
        engravings: string[];
        selectedSkills: string[];
        tierSets: string[];
        stats: string[];
    };
})[];
declare const output: {
    keys: {
        sortKey: {
            skillDPS: string[];
            skillDamage: string[];
            buff: string[];
        };
        filterKey: {
            engravings: string[];
            selectedSkills: string[];
            tierSets: string[];
            stats: string[];
        };
    };
    encodedData: {
        identifier: {
            characterName: string;
            className: string;
            id: number;
        };
        sortable: {
            skillDPS: number[];
            skillDamage: number[];
        };
        filterable: {
            engravings: string;
            selectedSkills: string;
            tierSets: string;
            stats: string;
        };
    }[];
};
export { data, output };
