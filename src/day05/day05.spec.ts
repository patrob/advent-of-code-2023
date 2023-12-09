import Day05 from "./day05";
import {
    convert,
    convertAll,
    parseConversion,
    parseConversions,
    parseMap,
    parseSeeds,
} from "./types";

describe("Day 5", () => {
    const testData = [
        "seeds: 79 14 55 13",
        "",
        "seed-to-soil map:",
        "50 98 2",
        "52 50 48",
        "",
        "soil-to-fertilizer map:",
        "0 15 37",
        "37 52 2",
        "39 0 15",
        "",
        "fertilizer-to-water map:",
        "49 53 8",
        "0 11 42",
        "42 0 7",
        "57 7 4",
        "",
        "water-to-light map:",
        "88 18 7",
        "18 25 70",
        "",
        "light-to-temperature map:",
        "45 77 23",
        "81 45 19",
        "68 64 13",
        "",
        "temperature-to-humidity map:",
        "0 69 1",
        "1 0 69",
        "",
        "humidity-to-location map:",
        "60 56 37",
        "56 93 4",
    ];

    let day05: Day05;
    beforeEach(() => {
        day05 = new Day05();
    });

    it("should create", () => {
        expect(day05).toBeTruthy();
    });

    describe("parseConversion", () => {
        const testCases = [
            {
                input: testData.slice(2, 5),
                expected: {
                    from: "seed",
                    to: "soil",
                    conversionFactors: [
                        { dest: 50, src: 98, range: 2 },
                        { dest: 52, src: 50, range: 48 },
                    ],
                },
            },
        ];
        it.each(testCases)(
            "should parse conversion $input",
            ({ input, expected }) => {
                expect(parseConversion(input)).toEqual(expected);
            }
        );
    });

    describe("parseConversions", () => {
        const testCases = [
            { input: testData.slice(0, 1), expected: [] },
            { input: testData.slice(0, 2), expected: [] },
            {
                input: testData.slice(0, 6),
                expected: [
                    {
                        from: "seed",
                        to: "soil",
                        conversionFactors: [
                            { dest: 50, src: 98, range: 2 },
                            { dest: 52, src: 50, range: 48 },
                        ],
                    },
                ],
            },
            {
                input: testData,
                expected: [
                    {
                        from: "seed",
                        to: "soil",
                        conversionFactors: [
                            { dest: 50, src: 98, range: 2 },
                            { dest: 52, src: 50, range: 48 },
                        ],
                    },
                    {
                        from: "soil",
                        to: "fertilizer",
                        conversionFactors: [
                            { dest: 0, src: 15, range: 37 },
                            { dest: 37, src: 52, range: 2 },
                            { dest: 39, src: 0, range: 15 },
                        ],
                    },
                    {
                        from: "fertilizer",
                        to: "water",
                        conversionFactors: [
                            { dest: 49, src: 53, range: 8 },
                            { dest: 0, src: 11, range: 42 },
                            { dest: 42, src: 0, range: 7 },
                            { dest: 57, src: 7, range: 4 },
                        ],
                    },
                    {
                        from: "water",
                        to: "light",
                        conversionFactors: [
                            { dest: 88, src: 18, range: 7 },
                            { dest: 18, src: 25, range: 70 },
                        ],
                    },
                    {
                        from: "light",
                        to: "temperature",
                        conversionFactors: [
                            { dest: 45, src: 77, range: 23 },
                            { dest: 81, src: 45, range: 19 },
                            { dest: 68, src: 64, range: 13 },
                        ],
                    },
                    {
                        from: "temperature",
                        to: "humidity",
                        conversionFactors: [
                            { dest: 0, src: 69, range: 1 },
                            { dest: 1, src: 0, range: 69 },
                        ],
                    },
                    {
                        from: "humidity",
                        to: "location",
                        conversionFactors: [
                            { dest: 60, src: 56, range: 37 },
                            { dest: 56, src: 93, range: 4 },
                        ],
                    },
                ],
            },
        ];
        it.each(testCases)(
            "should parse conversions $input",
            ({ input, expected }) => {
                expect(parseConversions(input)).toEqual(expected);
            }
        );
    });

    describe("parseSeeds", () => {
        const testCases = [{ input: testData, expected: [79, 14, 55, 13] }];
        it.each(testCases)(
            "should parse seeds $input",
            ({ input, expected }) => {
                expect(parseSeeds(input)).toEqual(expected);
            }
        );
    });

    describe("parseMap", () => {
        const testCases = [
            {
                input: testData,
                expected: {
                    seeds: [79, 14, 55, 13],
                    conversions: [
                        {
                            from: "seed",
                            to: "soil",
                            conversionFactors: [
                                { dest: 50, src: 98, range: 2 },
                                { dest: 52, src: 50, range: 48 },
                            ],
                        },
                        {
                            from: "soil",
                            to: "fertilizer",
                            conversionFactors: [
                                { dest: 0, src: 15, range: 37 },
                                { dest: 37, src: 52, range: 2 },
                                { dest: 39, src: 0, range: 15 },
                            ],
                        },
                        {
                            from: "fertilizer",
                            to: "water",
                            conversionFactors: [
                                { dest: 49, src: 53, range: 8 },
                                { dest: 0, src: 11, range: 42 },
                                { dest: 42, src: 0, range: 7 },
                                { dest: 57, src: 7, range: 4 },
                            ],
                        },
                        {
                            from: "water",
                            to: "light",
                            conversionFactors: [
                                { dest: 88, src: 18, range: 7 },
                                { dest: 18, src: 25, range: 70 },
                            ],
                        },
                        {
                            from: "light",
                            to: "temperature",
                            conversionFactors: [
                                { dest: 45, src: 77, range: 23 },
                                { dest: 81, src: 45, range: 19 },
                                { dest: 68, src: 64, range: 13 },
                            ],
                        },
                        {
                            from: "temperature",
                            to: "humidity",
                            conversionFactors: [
                                { dest: 0, src: 69, range: 1 },
                                { dest: 1, src: 0, range: 69 },
                            ],
                        },
                        {
                            from: "humidity",
                            to: "location",
                            conversionFactors: [
                                { dest: 60, src: 56, range: 37 },
                                { dest: 56, src: 93, range: 4 },
                            ],
                        },
                    ],
                },
            },
        ];

        it.each(testCases)("should parse map $input", ({ input, expected }) => {
            expect(parseMap(input)).toEqual(expected);
        });
    });

    describe("convert", () => {
        const testCases = [
            {
                seed: 79,
                conversionFactors: [
                    { dest: 50, src: 98, range: 2 },
                    { dest: 52, src: 50, range: 48 },
                ],
                expected: 81,
            },
            {
                seed: 14,
                conversionFactors: [
                    { dest: 50, src: 98, range: 2 },
                    { dest: 52, src: 50, range: 48 },
                ],
                expected: 14,
            },
            {
                seed: 55,
                conversionFactors: [
                    { dest: 50, src: 98, range: 2 },
                    { dest: 52, src: 50, range: 48 },
                ],
                expected: 57,
            },
            {
                seed: 13,
                conversionFactors: [
                    { dest: 50, src: 98, range: 2 },
                    { dest: 52, src: 50, range: 48 },
                ],
                expected: 13,
            },
        ];
        it.each(testCases)(
            "should convert seed $seed to soil",
            ({ seed, conversionFactors, expected }) => {
                expect(
                    convert(seed, { from: "", to: "", conversionFactors })
                ).toEqual(expected);
            }
        );
    });

    describe("convertAll", () => {
        const testCases = [
            {
                conversions: parseConversions(testData.slice(2)),
                src: 79,
                expected: 82,
            },
            {
                conversions: parseConversions(testData.slice(2)),
                src: 14,
                expected: 43,
            },
            {
                conversions: parseConversions(testData.slice(2)),
                src: 55,
                expected: 86,
            },
            {
                conversions: parseConversions(testData.slice(2)),
                src: 13,
                expected: 35,
            },
        ];

        it.each(testCases)(
            "should convert $src to $expected",
            ({ conversions, src, expected }) => {
                expect(convertAll(src, conversions)).toEqual(expected);
            }
        );
    });
});
