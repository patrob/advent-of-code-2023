import Day from "../day";
import { parseAndPointGames, parseAndProcessCopies } from "./types";

export default class Day04 extends Day {
    constructor() {
        super(4);
    }

    override solvePart1() {
        const result = parseAndPointGames(this.inputData);
        console.log(`Part 1: ${result}`);
    }

    override solvePart2() {
        const result = parseAndProcessCopies(this.inputData);
        console.log(`Part 2: ${result}`);
    }
}
