import Day from "../day";
import { Game, Round } from "./types";

export default class Day02 extends Day {
    part1RoundMax: Round = {
        red: 12,
        green: 13,
        blue: 14,
    };

    constructor() {
        super(2);
    }

    getGame(line: string): Game {
        const game: Game = {
            id: 0,
            rounds: [],
        };

        const parts = line.split(": ");
        game.id = parseInt(parts[0].split(" ")[1]);

        const rounds = parts[1].split("; ");
        rounds.forEach((round) => {
            const colors = round.split(", ");
            const roundObj: Round = { red: 0, green: 0, blue: 0 };
            colors.forEach((color) => {
                const [count, colorName] = color.split(" ");
                roundObj[colorName] = parseInt(count);
            });
            game.rounds.push(roundObj);
        });

        return game;
    }

    isValidRound(round: Round): boolean {
        return (
            Object.keys(round).filter(
                (color) => round[color] > this.part1RoundMax[color]
            ).length === 0
        );
    }

    isValidGame(game: Game): boolean {
        return (
            game.rounds.filter((round) => !this.isValidRound(round)).length ===
            0
        );
    }

    sumValidGameIds(games: Game[]): number {
        return games
            .filter((game) => this.isValidGame(game))
            .reduce((acc, game) => acc + game.id, 0);
    }

    getGameMinimumCubeCount(game: Game): Round {
        return game.rounds.reduce<Round>(
            (acc, round) => ({
                red: Math.max(acc.red, round.red),
                green: Math.max(acc.green, round.green),
                blue: Math.max(acc.blue, round.blue),
            }),
            { red: 0, green: 0, blue: 0 }
        );
    }

    getGamePower(game: Game): number {
        const minimumCubeCount = this.getGameMinimumCubeCount(game);
        return (
            minimumCubeCount.red *
            minimumCubeCount.green *
            minimumCubeCount.blue
        );
    }

    getGamesSumPower(games: Game[]): number {
        return games.reduce((acc, game) => acc + this.getGamePower(game), 0);
    }

    override solvePart1(): void {
        const games = this.inputData.map((line) => this.getGame(line));
        console.log(`Part 1: ${this.sumValidGameIds(games)}`);
    }

    override solvePart2(): void {
        const games = this.inputData.map((line) => this.getGame(line));
        console.log(`Part 2: ${this.getGamesSumPower(games)}`);
    }
}
