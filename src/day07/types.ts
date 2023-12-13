export type Hand = {
    cards: string[];
    bid: number;
};

export type RankedHand = Hand & {
    rank: number;
};

export const cardMap: { [key: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
};

export const cardMap2: { [key: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    J: 1,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
};

export const winRankMap: { [key: string]: number } = {
    "Five of a Kind": 100,
    "Four of a Kind": 90,
    "Full House": 80,
    "Three of a Kind": 70,
    "Two Pairs": 60,
    "One Pair": 50,
    "High Card": 0,
};

const getCardCounts = (cards: string[]): { [key: string]: number } => {
    let cardCounts = {};
    cards.forEach((card) => {
        if (cardCounts[card]) {
            cardCounts[card] += 1;
        } else {
            cardCounts[card] = 1;
        }
    });
    return cardCounts;
};

const getResultFromMaxMinCounts = (sortedCounts: string): string => {
    switch (sortedCounts) {
        case "5":
            return "Five of a Kind";
        case "4,1":
            return "Four of a Kind";
        case "3,2":
            return "Full House";
        case "3,1,1":
            return "Three of a Kind";
        case "2,2,1":
            return "Two Pairs";
        case "2,1,1,1":
            return "One Pair";
        default:
            return "High Card";
    }
};

export const getWinRank = (hand: Hand, jIsWild: boolean = false): string => {
    const { cards } = hand;
    const cardCounts = getCardCounts(cards);
    if (jIsWild && cardCounts["J"] < 5) {
        const maxCard = Object.keys(cardCounts)
            .filter((k) => k !== "J")
            .sort((a, b) => cardCounts[b] - cardCounts[a])[0];
        cardCounts[maxCard] += cardCounts["J"] || 0;
        delete cardCounts["J"];
    }
    const counts = Object.values(cardCounts).sort().reverse();
    return getResultFromMaxMinCounts(counts.join(","));
};

export const compareHighCards = (
    aCards: string[],
    bCards: string[],
    jIsWild: boolean = false
): string => {
    for (let i = 0; i < aCards.length; i++) {
        const aCard = jIsWild ? cardMap2[aCards[i]] : cardMap[aCards[i]];
        const bCard = jIsWild ? cardMap2[bCards[i]] : cardMap[bCards[i]];
        if (aCard > bCard) {
            return "A Wins";
        }
        if (aCard < bCard) {
            return "B Wins";
        }
    }
    return "Tie"; // should never get here.
};

export const compareWinRanks = (
    a: string,
    aCards: string[],
    b: string,
    bCards: string[],
    jIsWild: boolean = false
): string => {
    const rankA = winRankMap[a];
    const rankB = winRankMap[b];
    if (rankA > rankB) {
        return "A Wins";
    }
    if (rankA < rankB) {
        return "B Wins";
    }
    return compareHighCards(aCards, bCards, jIsWild);
};

export const parseHand = (hand: string): Hand => {
    const [cards, bid] = hand.split(" ");
    return {
        cards: cards.split(""),
        bid: parseInt(bid),
    };
};

export const sortHands = (hands: Hand[], jIsWild: boolean = false): Hand[] => {
    // hands.forEach((hand, i) =>
    //     console.log(i, hand.cards.join(""), getWinRank(hand, jIsWild))
    // );
    return hands.sort((a, b) => {
        const aRank = getWinRank(a, jIsWild);
        const bRank = getWinRank(b, jIsWild);
        const rankCompare = compareWinRanks(
            aRank,
            a.cards,
            bRank,
            b.cards,
            jIsWild
        );
        if (rankCompare === "A Wins") {
            return 1;
        }
        if (rankCompare === "B Wins") {
            return -1;
        }
        return 0;
    });
};

export const getTotalWinnings = (
    hands: Hand[],
    jIsWild: boolean = false
): number => {
    const sorted = sortHands(hands, jIsWild);
    return sorted.reduce((total, hand, i) => total + (i + 1) * hand.bid, 0);
};
