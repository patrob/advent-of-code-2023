import { readFile } from './utilities/file-reader';

export abstract class Day {
  protected inputData: string[] = [];

  constructor(protected day: number) {}

  run = async (
    options: {
      solveAll: boolean;
      solvePart1Only: boolean;
      solvePart2Only: boolean;
    } = { solveAll: true, solvePart1Only: false, solvePart2Only: false }
  ): Promise<void> => {
    this.printDayHeader();
    this.inputData = await this.getInputData();
    if (options.solveAll) this.solveAll();
    else if (options.solvePart1Only) this.solvePart1();
    else if (options.solvePart2Only) this.solvePart2();
  };

  private async getInputData(): Promise<string[]> {
    const dayString = this.day.toString().padStart(2, '0');
    const inputFilePath = `src/day${dayString}/input.txt`;
    return await readFile(inputFilePath);
  }

  private solveAll(): void {
    this.solvePart1();
    this.solvePart2();
  }

  private printDayHeader(): void {
    const dayString = this.day.toString().padStart(2, '0');
    console.log(`Day ${dayString}`);
  }

  solvePart1(): void {
    console.log('Part 1 not implemented yet');
  }
  solvePart2(): void {
    console.log('Part 2 not implemented yet');
  }
}
