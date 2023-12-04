import Day03 from "./day03";
import {
    getSumOfValidPartNumbers,
    getValidPartNumbers,
    isAdjacent,
    parseNumbers,
    parseNumbersRow,
    parseSpecialCharacters,
    parseSpecialCharactersRow,
} from "./types";

describe("Day 3", () => {
    const testData = [
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598..",
    ];
    let day03: Day03;
    beforeEach(() => {
        day03 = new Day03();
    });

    it("should create", () => {
        expect(day03).toBeTruthy();
    });

    describe("numbers", () => {
        describe("parseNumbers", () => {
            const testCases = [
                { input: testData[0], expected: ["467", "114"] },
                { input: testData[1], expected: [] },
                { input: testData[2], expected: ["35", "633"] },
                { input: testData[3], expected: [] },
                { input: testData[4], expected: ["617"] },
                { input: testData[5], expected: ["58"] },
                { input: testData[6], expected: ["592"] },
                { input: testData[7], expected: ["755"] },
                { input: testData[8], expected: [] },
                { input: testData[9], expected: ["664", "598"] },
            ];
            it.each(testCases)(
                "should parse '$input' as $expected",
                ({ input, expected }) => {
                    expect(parseNumbers(input)).toEqual(expected);
                }
            );
        });

        describe("parseNumbersRow", () => {
            const testCases = [
                {
                    row: 0,
                    input: testData[0],
                    expected: [
                        { rowIndex: 0, columnIndex: 0, value: "467" },
                        { rowIndex: 0, columnIndex: 5, value: "114" },
                    ],
                },
                { row: 1, input: testData[1], expected: [] },
                {
                    row: 2,
                    input: testData[2],
                    expected: [
                        { rowIndex: 2, columnIndex: 2, value: "35" },
                        { rowIndex: 2, columnIndex: 6, value: "633" },
                    ],
                },
                { row: 3, input: testData[3], expected: [] },
                {
                    row: 4,
                    input: testData[4],
                    expected: [{ rowIndex: 4, columnIndex: 0, value: "617" }],
                },
                {
                    row: 5,
                    input: testData[5],
                    expected: [{ rowIndex: 5, columnIndex: 7, value: "58" }],
                },
                {
                    row: 6,
                    input: testData[6],
                    expected: [{ rowIndex: 6, columnIndex: 2, value: "592" }],
                },
                {
                    row: 7,
                    input: testData[7],
                    expected: [{ rowIndex: 7, columnIndex: 6, value: "755" }],
                },
                { row: 8, input: testData[8], expected: [] },
                {
                    row: 9,
                    input: testData[9],
                    expected: [
                        { rowIndex: 9, columnIndex: 1, value: "664" },
                        { rowIndex: 9, columnIndex: 5, value: "598" },
                    ],
                },
            ];

            it.each(testCases)(
                "should parse '$input' as $expected",
                ({ row, input, expected }) => {
                    expect(parseNumbersRow(row, input)).toEqual(expected);
                }
            );
        });
    });

    describe("special characters", () => {
        describe("parseSpecialCharacters", () => {
            const testCases = [
                { input: testData[0], expected: [] },
                { input: testData[1], expected: ["*"] },
                { input: testData[2], expected: [] },
                { input: testData[3], expected: ["#"] },
                { input: testData[4], expected: ["*"] },
                { input: testData[5], expected: ["+"] },
                { input: testData[6], expected: [] },
                { input: testData[7], expected: [] },
                { input: testData[8], expected: ["$", "*"] },
                { input: testData[9], expected: [] },
                {
                    input: "*+=%-#@/&$",
                    expected: [..."*+=%-#@/&$"],
                },
            ];
            it.each(testCases)(
                "should parse '$input' as $expected",
                ({ input, expected }) => {
                    expect(parseSpecialCharacters(input)).toEqual(expected);
                }
            );
        });
        describe("parseSpecialcharactersRow", () => {
            const testCases = [
                {
                    row: 0,
                    input: testData[0],
                    expected: [],
                },
                {
                    row: 1,
                    input: testData[1],
                    expected: [{ rowIndex: 1, columnIndex: 3, value: "*" }],
                },
                {
                    row: 2,
                    input: testData[2],
                    expected: [],
                },
                {
                    row: 3,
                    input: testData[3],
                    expected: [{ rowIndex: 3, columnIndex: 6, value: "#" }],
                },
                {
                    row: 4,
                    input: testData[4],
                    expected: [{ rowIndex: 4, columnIndex: 3, value: "*" }],
                },
                {
                    row: 5,
                    input: testData[5],
                    expected: [{ rowIndex: 5, columnIndex: 5, value: "+" }],
                },
                {
                    row: 6,
                    input: testData[6],
                    expected: [],
                },
                {
                    row: 7,
                    input: testData[7],
                    expected: [],
                },
                {
                    row: 8,
                    input: testData[8],
                    expected: [
                        { rowIndex: 8, columnIndex: 3, value: "$" },
                        { rowIndex: 8, columnIndex: 5, value: "*" },
                    ],
                },
                {
                    row: 9,
                    input: testData[9],
                    expected: [],
                },
            ];

            it.each(testCases)(
                "should parse '$input' as $expected",
                ({ row, input, expected }) => {
                    expect(parseSpecialCharactersRow(row, input)).toEqual(
                        expected
                    );
                }
            );
        });
    });

    describe("isAdjacent", () => {
        const testCases = [
            {
                part: { rowIndex: 0, columnIndex: 0, value: "1" },
                specialChar: { rowIndex: 1, columnIndex: 0, value: "*" },
                expected: true,
            },
            {
                part: { rowIndex: 0, columnIndex: 1, value: "1" },
                specialChar: { rowIndex: 1, columnIndex: 0, value: "*" },
                expected: true,
            },
        ];
        it.each(testCases)(
            "should be $expected for $part and $specialChar",
            ({ part, specialChar, expected }) => {
                expect(isAdjacent(specialChar, part)).toBe(expected);
            }
        );
    });

    describe("getValidPartNumbers", () => {
        const testCases = [
            {
                input: ["467..114..", "...*......"],
                expected: ["467"],
            },
            {
                input: ["467..114..", "...*......", "..35..633."],
                expected: ["467", "35"],
            },
            {
                input: testData,
                expected: [
                    "467",
                    "35",
                    "633",
                    "617",
                    "592",
                    "755",
                    "664",
                    "598",
                ],
            },
            {
                input: ["...100...", ".100*100.", "...100..."],
                expected: ["100", "100", "100", "100"],
            },
            {
                input: ["...100...", ".10.*10..", "...100..."],
                expected: ["100", "10", "100"],
            },
            {
                input: ["...100...", ".10.**10..", "...100..."],
                expected: ["100", "10", "100"],
            },
        ];

        it.each(testCases)(
            "should parse '$input' as $expected",
            ({ input, expected }) => {
                expect(getValidPartNumbers(input)).toStrictEqual(expected);
            }
        );
    });

    describe("getSumOfValidPartNumbers", () => {
        it("should return 4361", () => {
            expect(getSumOfValidPartNumbers(testData)).toBe(4361);
        });
    });
});
