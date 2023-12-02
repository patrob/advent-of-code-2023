import Day01 from "./day01";

describe("Day 01", () => {
    let day: Day01;
    beforeEach(() => {
        day = new Day01();
    });

    describe("Part 1", () => {
        const testData = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

        describe("extractFirstNumber", () => {
            const testCases = [
                { input: testData[0], expected: 1 },
                { input: testData[1], expected: 3 },
                { input: testData[2], expected: 1 },
                { input: testData[3], expected: 7 },
            ];
            it.each(testCases)(
                "should return '$expected' when given '$input'",
                ({ input, expected }) => {
                    expect(day.extractFirstNumber(input)).toBe(expected);
                }
            );
        });
        describe("extractLastNumber", () => {
            const testCases = [
                { input: testData[0], expected: 2 },
                { input: testData[1], expected: 8 },
                { input: testData[2], expected: 5 },
                { input: testData[3], expected: 7 },
            ];
            it.each(testCases)(
                "should return '$expected' when given '$input'",
                ({ input, expected }) => {
                    expect(day.extractLastNumber(input)).toBe(expected);
                }
            );
        });

        describe("getSumOfMatchingNumbers", () => {
            const testCases = [
                { input: testData[0], expected: 12 },
                { input: testData[1], expected: 38 },
                { input: testData[2], expected: 15 },
                { input: testData[3], expected: 77 },
            ];
            it.each(testCases)(
                "should return '$expected' when given '$input'",
                ({ input, expected }) => {
                    expect(day.getSumOfMatchingNumbers(input)).toBe(expected);
                }
            );

            it("should return correct test sum", () => {
                const sum = testData.reduce(
                    (prev, current) =>
                        day.getSumOfMatchingNumbers(current) + prev,
                    0
                );
                expect(sum).toBe(142);
            });
        });
    });

    describe("Part 2", () => {
        const testData = [
            "two1nine",
            "eightwothree",
            "abcone2threexyz",
            "xtwone3four",
            "4nineeightseven2",
            "zoneight234",
            "7pqrstsixteen",
        ];
        describe("extractFirstNumberNumericOrWord", () => {
            const testCases = [
                { input: testData[0], expected: 2 },
                { input: testData[1], expected: 8 },
                { input: testData[2], expected: 1 },
                { input: testData[3], expected: 2 },
                { input: testData[4], expected: 4 },
                { input: testData[5], expected: 1 },
                { input: testData[6], expected: 7 },
            ];

            it.each(testCases)(
                "should return '$expected' when given '$input'",
                ({ input, expected }) => {
                    expect(day.extractFirstNumberNumericOrWord(input)).toBe(
                        expected
                    );
                }
            );
        });

        describe("extractLastNumberNumericOrWord", () => {
            const testCases = [
                { input: testData[0], expected: 9 },
                { input: testData[1], expected: 3 },
                { input: testData[2], expected: 3 },
                { input: testData[3], expected: 4 },
                { input: testData[4], expected: 2 },
                { input: testData[5], expected: 4 },
                { input: testData[6], expected: 6 },
            ];
            it.each(testCases)(
                "should return '$expected' when given '$input'",
                ({ input, expected }) => {
                    expect(day.extractLastNumberNumericOrWord(input)).toBe(
                        expected
                    );
                }
            );
        });
        describe("getSumOfMatchingNumbersNumericOrWord", () => {
            const testCases = [
                { input: testData[0], expected: 29 },
                { input: testData[1], expected: 83 },
                { input: testData[2], expected: 13 },
                { input: testData[3], expected: 24 },
                { input: testData[4], expected: 42 },
                { input: testData[5], expected: 14 },
                { input: testData[6], expected: 76 },
            ];
            it.each(testCases)(
                "should return '$expected' when given '$input'",
                ({ input, expected }) => {
                    expect(
                        day.getSumOfMatchingNumbersNumericOrWord(input)
                    ).toBe(expected);
                }
            );

            it("should return correct test sum", () => {
                const sum = testData.reduce(
                    (prev, current) =>
                        day.getSumOfMatchingNumbersNumericOrWord(current) +
                        prev,
                    0
                );
                expect(sum).toBe(281);
            });
        });
    });
});
