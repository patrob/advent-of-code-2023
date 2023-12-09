import Day from "../day";
import {
    Conversion,
    ConversionFactor,
    convertAll,
    parseConversions,
    parseSeeds,
    testData,
} from "./types";

export default class Day05 extends Day {
    constructor() {
        super(5);
    }

    override solvePart1() {
        const conversions = parseConversions(this.inputData);
        const seeds = parseSeeds(this.inputData);
        const lowestSeed = Math.min(
            ...seeds.map((seed) => convertAll(seed, conversions))
        );
        console.log(`Part 1: ${lowestSeed}`);
    }

    async findLowestSeed(
        i: number,
        seeds: number[],
        conversions: Conversion[]
    ): Promise<number> {
        let lowestSeed = Number.MAX_VALUE;
        for (let j = 0; j < seeds[i + 1]; j++) {
            const seed = seeds[i] + j;
            const converted = convertAll(seed, conversions);
            if (converted < lowestSeed) {
                lowestSeed = converted;
            }
        }
        return lowestSeed;
    }

    override async solvePart2() {
        const conversions = parseConversions(this.inputData);
        const seeds = parseSeeds(this.inputData);
        let lowestSeed = Number.MAX_VALUE;
        let promises: Promise<number>[] = [];
        for (let i = 0; i < seeds.length; i += 2) {
            promises.push(this.findLowestSeed(i, seeds, conversions));
        }
        const lowestSeeds = await Promise.all(promises);
        lowestSeed = Math.min(...lowestSeeds);
        console.log(`Part 2: ${lowestSeed}`);
    }
}
