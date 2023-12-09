import Day from "../day";
import { convertAll, parseConversions, parseSeeds } from "./types";

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

    override solvePart2() {
        console.log("Part 2: not implemented yet");
    }
}
