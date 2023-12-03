import Day02 from "./day02";
import { Round } from "./types";

describe("Day 02", () => {
    const testData = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    ];
    let day02: Day02;
    beforeEach(() => {
        day02 = new Day02();
    });

    it("should create", () => {
        expect(day02).toBeTruthy();
    });

    describe("getGame", () => {
        it("should return a game", () => {
            const game = day02.getGame(testData[0]);
            expect(game).toBeTruthy();
            expect(game.id).toBe(1);
            expect(game.rounds.length).toBe(3);
            expect(game.rounds[0].blue).toBe(3);
            expect(game.rounds[0].red).toBe(4);
            expect(game.rounds[0].green).toBeFalsy();
        });
    });

    describe("isValidRound", () => {
        const testCases = [
            {
                round: new Day02().getGame(testData[0]).rounds[0],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[0]).rounds[1],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[0]).rounds[2],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[1]).rounds[0],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[1]).rounds[1],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[1]).rounds[2],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[2]).rounds[0],
                expected: false,
            },
            {
                round: new Day02().getGame(testData[2]).rounds[1],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[2]).rounds[2],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[3]).rounds[0],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[3]).rounds[1],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[3]).rounds[2],
                expected: false,
            },
            {
                round: new Day02().getGame(testData[4]).rounds[0],
                expected: true,
            },
            {
                round: new Day02().getGame(testData[4]).rounds[1],
                expected: true,
            },
        ];

        it.each(testCases)(
            "should return $expected for $round",
            ({ round, expected }) => {
                expect(day02.isValidRound(round)).toBe(expected);
            }
        );
    });

    describe("isValidGame", () => {
        const testCases = [
            { game: new Day02().getGame(testData[0]), expected: true },
            { game: new Day02().getGame(testData[1]), expected: true },
            { game: new Day02().getGame(testData[2]), expected: false },
            { game: new Day02().getGame(testData[3]), expected: false },
            { game: new Day02().getGame(testData[4]), expected: true },
        ];

        it.each(testCases)(
            "should return $expected for $game",
            ({ game, expected }) => {
                expect(day02.isValidGame(game)).toBe(expected);
            }
        );
    });

    describe("sumValidGameIds", () => {
        it("should return 3 for testData", () => {
            const games = testData.map((line) => day02.getGame(line));
            expect(day02.sumValidGameIds(games)).toBe(8);
        });
    });

    describe("getGameMinimumCubeCount", () => {
        const testCases = [
            {
                game: new Day02().getGame(testData[0]),
                expected: { red: 4, green: 2, blue: 6 },
            },
            {
                game: new Day02().getGame(testData[1]),
                expected: { red: 1, green: 3, blue: 4 },
            },
            {
                game: new Day02().getGame(testData[2]),
                expected: { red: 20, green: 13, blue: 6 },
            },
            {
                game: new Day02().getGame(testData[3]),
                expected: { red: 14, green: 3, blue: 15 },
            },
            {
                game: new Day02().getGame(testData[4]),
                expected: { red: 6, green: 3, blue: 2 },
            },
        ];
        it.each(testCases)(
            "should return $expected for game $game.id",
            ({ game, expected }) => {
                expect(day02.getGameMinimumCubeCount(game)).toEqual(expected);
            }
        );
    });

    describe("getGamePower", () => {
        const testCases = [
            {
                game: new Day02().getGame(testData[0]),
                expected: 48,
            },
            {
                game: new Day02().getGame(testData[1]),
                expected: 12,
            },
            {
                game: new Day02().getGame(testData[2]),
                expected: 1560,
            },
            {
                game: new Day02().getGame(testData[3]),
                expected: 630,
            },
            {
                game: new Day02().getGame(testData[4]),
                expected: 36,
            },
        ];

        it.each(testCases)(
            "should return $expected for game $game.id",
            ({ game, expected }) => {
                expect(day02.getGamePower(game)).toBe(expected);
            }
        );
    });

    describe("getGamesSumPower", () => {
        it("should return 2286 for testData", () => {
            const games = testData.map((line) => day02.getGame(line));
            expect(day02.getGamesSumPower(games)).toBe(2286);
        });
    });
});
