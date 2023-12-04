import Day from "../day";
import {
    getSumOfGearRatios,
    getSumOfValidPartNumbers,
    getValidPartNumbers,
    isAdjacent,
    parseNumbers,
    parseNumbersRow,
    parseSpecialCharacters,
    parseSpecialCharactersRow,
} from "./types";

export default class Day03 extends Day {
    constructor() {
        super(3);
    }

    override solvePart1() {
        const validPartSum = getSumOfValidPartNumbers(this.inputData);
        console.log(`Part 1: ${validPartSum}`);
    }

    override solvePart2() {
        const gearRatios = getSumOfGearRatios(this.inputData);
        console.log(`Part 2: ${gearRatios}`);
    }
}
