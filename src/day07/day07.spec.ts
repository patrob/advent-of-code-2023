import Day07 from "./day07";
import {
    compareWinRanks,
    getTotalWinnings,
    getWinRank,
    parseHand,
    sortHands,
} from "./types";

describe("Day 7", () => {
    const testData = [
        "32T3K 765",
        "T55J5 684",
        "KK677 28",
        "KTJJT 220",
        "QQQJA 483",
    ];
    let day07: Day07;
    beforeEach(() => {
        day07 = new Day07();
    });

    it("should create", () => {
        expect(day07).toBeTruthy();
    });

    describe("parseHand", () => {
        const testCases = [
            {
                hand: "32T3K 765",
                expected: { cards: ["3", "2", "T", "3", "K"], bid: 765 },
            },
            {
                hand: "T55J5 684",
                expected: { cards: ["T", "5", "5", "J", "5"], bid: 684 },
            },
            {
                hand: "KK677 28",
                expected: { cards: ["K", "K", "6", "7", "7"], bid: 28 },
            },
            {
                hand: "KTJJT 220",
                expected: { cards: ["K", "T", "J", "J", "T"], bid: 220 },
            },
            {
                hand: "QQQJA 483",
                expected: { cards: ["Q", "Q", "Q", "J", "A"], bid: 483 },
            },
        ];

        it.each(testCases)("should parse %s", ({ hand, expected }) => {
            expect(parseHand(hand)).toEqual(expected);
        });
    });

    describe("getWinRank", () => {
        const testCases = [
            {
                hand: { cards: ["3", "2", "T", "3", "K"], bid: 1 },
                expected: "One Pair",
            },
            {
                hand: { cards: ["K", "K", "6", "7", "7"], bid: 1 },
                expected: "Two Pairs",
            },
            {
                hand: { cards: ["T", "5", "5", "J", "5"], bid: 1 },
                expected: "Four of a Kind",
            },
            {
                hand: { cards: ["Q", "Q", "Q", "J", "A"], bid: 1 },
                expected: "Four of a Kind",
            },
            {
                hand: { cards: ["Q", "Q", "Q", "2", "A"], bid: 1 },
                expected: "Three of a Kind",
            },
            {
                hand: { cards: ["K", "T", "J", "J", "T"], bid: 1 },
                expected: "Four of a Kind",
            },
            {
                hand: { cards: ["T", "T", "K", "K", "T"], bid: 1 },
                expected: "Full House",
            },
            {
                hand: { cards: ["T", "K", "K", "J", "T"], bid: 1 },
                expected: "Full House",
            },
            {
                hand: { cards: "JJJJJ".split(""), bid: 1 },
                expected: "Five of a Kind",
            },
            {
                hand: { cards: "7JJJ7".split(""), bid: 1 },
                expected: "Five of a Kind",
            },
        ];

        it.each(testCases)(
            "should get $expected with hand $hand.cards",
            ({ hand, expected }) => {
                const result = getWinRank(hand, true);
                expect(result).toStrictEqual(expected);
            }
        );
    });

    describe("compareWinRanks", () => {
        const testCases = [
            {
                hands: [
                    { cards: ["3", "3", "3", "3", "2"], bid: 1 },
                    { cards: ["2", "A", "A", "A", "A"], bid: 1 },
                ],
                joker: false,
                expected: "A Wins",
            },
            {
                hands: [
                    { cards: "JKKK2".split(""), bid: 1 },
                    { cards: "QQQQ2".split(""), bid: 1 },
                ],
                joker: false,
                expected: "B Wins",
            },
            {
                hands: [
                    { cards: "JKKK2".split(""), bid: 1 },
                    { cards: "JQQQ2".split(""), bid: 1 },
                ],
                joker: true,
                expected: "A Wins",
            },
        ];
        it.each(testCases)(
            "should compare %s",
            ({ hands, joker, expected }) => {
                const [a, b] = hands;
                const result = compareWinRanks(
                    getWinRank(a, joker),
                    a.cards,
                    getWinRank(b, joker),
                    b.cards
                );
                expect(result).toEqual(expected);
            }
        );
    });

    describe("sortHands", () => {
        it("should sort hands", () => {
            const hands = testData.map(parseHand);
            const sorted = sortHands(hands);
            expect(sorted[0].cards).toEqual(["3", "2", "T", "3", "K"]);
            expect(sorted[1].cards).toEqual(["K", "T", "J", "J", "T"]);
            expect(sorted[2].cards).toEqual(["K", "K", "6", "7", "7"]);
            expect(sorted[3].cards).toEqual(["T", "5", "5", "J", "5"]);
            expect(sorted[4].cards).toEqual(["Q", "Q", "Q", "J", "A"]);
        });

        it("should sort hands with J is Wild", () => {
            const hands = testData.map(parseHand);
            const sorted = sortHands(hands, true);
            expect(sorted[0].cards).toEqual(["3", "2", "T", "3", "K"]);
            expect(sorted[1].cards).toEqual(["K", "K", "6", "7", "7"]);
            expect(sorted[2].cards).toEqual(["T", "5", "5", "J", "5"]);
            expect(sorted[3].cards).toEqual(["Q", "Q", "Q", "J", "A"]);
            expect(sorted[4].cards).toEqual(["K", "T", "J", "J", "T"]);
        });
    });

    describe("getTotalWinnings", () => {
        it("should get total winnings", () => {
            const hands = testData.map(parseHand);
            const total = getTotalWinnings(hands);
            expect(total).toEqual(6440);
        });

        it("should get total winnings with jokers", () => {
            const hands = testData.map(parseHand);
            const total = getTotalWinnings(hands, true);
            expect(total).toEqual(5905);
        });
    });
});
