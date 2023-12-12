export type Race = {
    time: number;
    distance: number;
};

export const parseRaces = (input: string[]): Race[] => {
    const times = input[0].match(/\d+/g).map((time) => parseInt(time, 10));
    const distances = input[1].match(/\d+/g).map((time) => parseInt(time, 10));
    return times.map((time, index) => ({
        time,
        distance: distances[index],
    }));
};

export const parseRacePart2 = (input: string[]): Race => {
    const races = parseRaces(input);
    const actualTime = races.reduce((acc, cur) => `${acc}${cur.time}`, "");
    const actualDistance = races.reduce(
        (acc, cur) => `${acc}${cur.distance}`,
        ""
    );
    return {
        time: Number(actualTime),
        distance: Number(actualDistance),
    };
};

export const calculateDistance = (time: number, limit: number): number => {
    if (time === 0 || time === limit) return 0;
    return time * (limit - time);
};

export const findRecordBeaters = (race: Race): number[] => {
    return Array(race.time)
        .fill(1)
        .map((_, i) => i)
        .filter(
            (i) =>
                i > 0 &&
                i < race.time &&
                calculateDistance(i, race.time) > race.distance
        );
};

export const multiplyResultCounts = (races: Race[]): number => {
    return races.reduce((acc, cur) => acc * findRecordBeaters(cur).length, 1);
};
