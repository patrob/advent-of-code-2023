import Day04 from "./day04";
import {
    parseAndPointGames,
    parseAndProcessCopies,
    parseGame,
    pointGame,
} from "./types";

describe("Day 4", () => {
    const testData = [
        "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
        "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
        "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
        "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
        "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
        "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
    ];

    let day04: Day04;
    beforeEach(() => {
        day04 = new Day04();
    });

    it("should create", () => {
        expect(day04).toBeTruthy();
    });

    describe("pointGame", () => {
        const testCases = [
            {
                game: {
                    id: 1,
                    winningNumbers: [1, 2, 3, 4, 5],
                    myNumbers: [1, 2, 3, 4, 5],
                    matches: 5,
                },
                expected: 16,
            },
            {
                game: {
                    id: 2,
                    winningNumbers: [1, 2, 3, 4, 5],
                    myNumbers: [1, 2, 3, 4, 6],
                    matches: 4,
                },
                expected: 8,
            },
        ];

        it.each(testCases)(
            "should return $expected for $game",
            ({ game, expected }) => {
                expect(pointGame(game)).toBe(expected);
            }
        );
    });

    describe("parseGame", () => {
        const testCases = [
            {
                input: testData[0],
                expected: {
                    id: 1,
                    winningNumbers: [41, 48, 83, 86, 17],
                    myNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
                    matches: 4,
                },
            },
            {
                input: testData[1],
                expected: {
                    id: 2,
                    winningNumbers: [13, 32, 20, 16, 61],
                    myNumbers: [61, 30, 68, 82, 17, 32, 24, 19],
                    matches: 2,
                },
            },
            {
                input: testData[2],
                expected: {
                    id: 3,
                    winningNumbers: [1, 21, 53, 59, 44],
                    myNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
                    matches: 2,
                },
            },
            {
                input: testData[3],
                expected: {
                    id: 4,
                    winningNumbers: [41, 92, 73, 84, 69],
                    myNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
                    matches: 1,
                },
            },
            {
                input: testData[4],
                expected: {
                    id: 5,
                    winningNumbers: [87, 83, 26, 28, 32],
                    myNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
                    matches: 0,
                },
            },
            {
                input: testData[5],
                expected: {
                    id: 6,
                    winningNumbers: [31, 18, 13, 56, 72],
                    myNumbers: [74, 77, 10, 23, 35, 67, 36, 11],
                    matches: 0,
                },
            },
        ];
        it.each(testCases)(
            "should return $expected for $input",
            ({ input, expected }) => {
                expect(parseGame(input)).toEqual(expected);
            }
        );
    });

    describe("parseAndPointGames", () => {
        it("should return 13", () => {
            expect(parseAndPointGames(testData)).toBe(13);
        });
    });

    describe("parseAndProcessCopies", () => {
        const testCases = [
            { input: ["Card 1: 1 2 3 4 5 | 6 7 8 9 0"], expected: 1 },
            {
                input: [
                    "Card 1: 1 2 3 4 5 | 6 7 8 9 1",
                    "Card 2: 1 2 3 4 5 | 6 7 8 9 0",
                ],
                expected: 3,
            },
            {
                input: [
                    "Card 1: 1 2 3 4 5 | 6 7 8 9 1",
                    "Card 2: 1 2 3 4 5 | 6 7 8 9 0",
                    "Card 3: 1 2 3 4 5 | 6 7 8 9 0",
                ],
                expected: 4,
            },
            {
                input: [
                    "Card 1: 1 2 3 4 5 | 5 7 8 9 1", // 1
                    "Card 2: 1 2 3 4 5 | 5 7 8 9 0", // 1 * 2
                    "Card 3: 1 2 3 4 5 | 6 7 8 9 0", // 1 * 2 * 2
                ],
                expected: 7,
            },
            { input: testData, expected: 30 },
        ];
        it.each(testCases)(
            "should return $expected for $input",
            ({ input, expected }) => {
                console.log(expected);
                expect(parseAndProcessCopies(input)).toBe(expected);
            }
        );
    });
});
