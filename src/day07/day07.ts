import Day from "../day";
import { getTotalWinnings, getWinRank, parseHand } from "./types";

export default class Day07 extends Day {
    constructor() {
        super(7);
    }

    override solvePart1() {
        const hands = this.inputData.map(parseHand);
        const results = getTotalWinnings(hands);
        console.log(`Part 1: ${results}`);
    }

    override solvePart2() {
        const hands = this.inputData.map(parseHand);
        const results = getTotalWinnings(hands, true);
        console.log(`Part 2: ${results}`);
    }
}
