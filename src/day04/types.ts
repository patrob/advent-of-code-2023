export type Game = {
    id: number;
    winningNumbers: number[];
    myNumbers: number[];
    matches: number;
};

export const getMatchCount = (
    winningNumbers: number[],
    myNumbers: number[]
): number => {
    const intersection = myNumbers.reduce(
        (acc, current) => acc + (winningNumbers.includes(current) ? 1 : 0),
        0
    );
    return intersection;
};

export const pointGame = (game: Game): number => {
    return game.matches ? Math.pow(2, game.matches - 1) : 0;
};

export const parseGame = (input: string): Game => {
    const [id, numbers] = input.split(": ");
    const [winningNumbers, myNumbers] = numbers.split("|").map((x) =>
        x
            .split(" ")
            .filter((x) => x.length > 0)
            .map((x) => parseInt(x))
    );
    return {
        id: parseInt(id.replace("Card ", "")),
        winningNumbers,
        myNumbers,
        matches: getMatchCount(winningNumbers, myNumbers),
    };
};

export const parseAndPointGames = (input: string[]): number => {
    const games = input.map((x) => parseGame(x));
    return games.reduce((acc, cur) => acc + pointGame(cur), 0);
};

export const getCardCounts = (
    games: Game[]
): { id: number; count: number }[] => {
    const ids = games.map((x) => x.id);
    const counts = [];
    ids.forEach((id) => {
        if (counts.find((x) => x.id === id)) {
            return;
        }
        counts.push({ id, count: ids.filter((x) => x === id).length });
    });

    return counts.sort((a, b) => a.id - b.id);
};

export const pushCardMatches = (index: number, games: Game[]): Game[] => {
    return Array(games[index].matches)
        .fill(1)
        .reduce<Game[]>((acc, _, i) => {
            console.log("acc", acc);
            return [...acc, { ...games[index + i + 1] }];
        }, []);
};

export const doTheThing = (
    index: number,
    games: Game[],
    cardStack: Game[]
): number => {
    if (index === games.length) {
        return cardStack.length;
    }

    const cardCopiesCount =
        cardStack.filter((x) => x.id === games[index].id).length + 1;
    Array(cardCopiesCount)
        .fill(1)
        .forEach(() => cardStack.push(...pushCardMatches(index, games)));

    cardStack.push(games[index]);

    return doTheThing(index + 1, games, cardStack);
};
export const parseAndProcessCopies = (input: string[]): number => {
    const games = input.map((x) => parseGame(x));
    return doTheThing(0, games, []);
};
