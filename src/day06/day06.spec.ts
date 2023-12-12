import Day06 from "./day06";
import {
    calculateDistance,
    findRecordBeaters,
    multiplyResultCounts,
    parseRacePart2,
    parseRaces,
} from "./types";

describe("Day 6", () => {
    const testData = ["Time:      7  15   30", "Distance:  9  40  200"];
    let day06: Day06;
    beforeEach(() => {
        day06 = new Day06();
    });

    it("should create", () => {
        expect(day06).toBeTruthy();
    });

    describe("parseRaces", () => {
        it("should return expected result", () => {
            expect(parseRaces(testData)).toEqual([
                { time: 7, distance: 9 },
                { time: 15, distance: 40 },
                { time: 30, distance: 200 },
            ]);
        });
    });

    describe("calculateDistance", () => {
        const testCases = [
            { time: 0, limit: 7, expected: 0 },
            { time: 1, limit: 7, expected: 6 },
            { time: 2, limit: 7, expected: 10 },
            { time: 3, limit: 7, expected: 12 },
            { time: 4, limit: 7, expected: 12 },
            { time: 5, limit: 7, expected: 10 },
            { time: 6, limit: 7, expected: 6 },
            { time: 7, limit: 7, expected: 0 },
        ];

        it.each(testCases)(
            "should return $expected when time is $time and limit is $limit",
            ({ time, limit, expected }) => {
                expect(calculateDistance(time, limit)).toEqual(expected);
            }
        );
    });

    describe("findRecordBeaters", () => {
        const testCases = [
            { race: { time: 7, distance: 9 }, expected: [2, 3, 4, 5] },
            {
                race: { time: 15, distance: 40 },
                expected: [4, 5, 6, 7, 8, 9, 10, 11],
            },
            {
                race: { time: 30, distance: 200 },
                expected: [11, 12, 13, 14, 15, 16, 17, 18, 19],
            },
            {
                race: {
                    time: 71530,
                    distance: 940200,
                },
                expected: Array(71503)
                    .fill(1)
                    .map((_, i) => i + 14),
            },
        ];

        it.each(testCases)(
            "should find $expected for $race",
            ({ race, expected }) => {
                expect(findRecordBeaters(race)).toEqual(expected);
            }
        );
    });

    describe("multiplyResultCounts", () => {
        const races = [
            { time: 7, distance: 9 },
            { time: 15, distance: 40 },
            { time: 30, distance: 200 },
        ];
        it("should return 4 * 8 * 9 = 288", () => {
            expect(multiplyResultCounts(races)).toBe(288);
        });
    });

    describe("parseRacePart2", () => {
        it("should return expected result", () => {
            expect(parseRacePart2(testData)).toEqual({
                time: 71530,
                distance: 940200,
            });
        });
    });
});
