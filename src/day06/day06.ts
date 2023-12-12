import Day from "../day";
import {
    findRecordBeaters,
    multiplyResultCounts,
    parseRacePart2,
    parseRaces,
} from "./types";

export default class Day06 extends Day {
    constructor() {
        super(6);
    }

    override solvePart1() {
        const races = parseRaces(this.inputData);
        console.log(`Part 1: ${multiplyResultCounts(races)}`);
    }

    override solvePart2() {
        const race = parseRacePart2(this.inputData);
        console.log(`Part 2: ${findRecordBeaters(race).length}`);
    }
}
