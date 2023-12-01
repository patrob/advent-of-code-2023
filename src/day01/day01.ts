import { Day } from '../day';

export class Day01 extends Day {
  wordNames = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  comboNames = this.wordNames
    .map((word) => ({
      word,
      otherWords: this.wordNames.filter(
        (otherWord) =>
          otherWord !== word &&
          otherWord.charAt(0) === word.charAt(word.length - 1)
      ),
    }))
    .reduce<{ find: string; replace: string }[]>(
      (acc, { word, otherWords }) =>
        (acc = [
          ...acc,
          ...otherWords.map((ow) => ({
            find: `${word}${ow.slice(1)}`,
            replace: `${word}${ow}`,
          })),
        ]),
      []
    );

  numberWordMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  numberWordMatch =
    /([1-9]|one|two|three|four|five|six|seven|eight|nine){1,1}/gi;

  constructor() {
    super(1);
  }

  replaceSillyNames(line: string): string {
    return this.comboNames.reduce<string>(
      (acc, comboName) =>
        (acc = acc.replaceAll(comboName.find, comboName.replace)),
      line
    );
  }

  extractFirstNumber(line: string): number {
    return line.match(/[1-9]{1,1}/g)?.map(Number)[0] ?? 0;
  }

  extractFirstNumberNumericOrWord(line: string): number {
    const match = line.match(this.numberWordMatch)[0];
    return Number(match) || this.numberWordMap[match];
  }

  extractLastNumber(line: string): number {
    const matches = line.match(/\d{1,1}/g)?.map(Number) ?? [0];
    return matches[matches.length - 1];
  }

  extractLastNumberNumericOrWord(line: string): number {
    const matches = line.match(this.numberWordMatch);
    const match = matches[matches.length - 1];
    return Number(match) || this.numberWordMap[match];
  }

  getFirstAndLastNumbers(line: string): [number, number] {
    return [this.extractFirstNumber(line) * 10, this.extractLastNumber(line)];
  }

  getFirstAndLastNumbersNumericOrWord(line: string): [number, number] {
    const sanitized = this.replaceSillyNames(line);
    return [
      this.extractFirstNumberNumericOrWord(sanitized) * 10,
      this.extractLastNumberNumericOrWord(sanitized),
    ];
  }

  getSumOfMatchingNumbers(line: string): number {
    const numbers = this.getFirstAndLastNumbers(line);
    return numbers.reduce((sum, number) => sum + number, 0);
  }

  getSumOfMatchingNumbersNumericOrWord(line: string): number {
    const numbers = this.getFirstAndLastNumbersNumericOrWord(line);
    return numbers.reduce((sum, number) => sum + number, 0);
  }

  override solvePart1(): void {
    const sums = this.inputData.map((line) =>
      this.getSumOfMatchingNumbers(line)
    );
    const sum = sums.reduce((sum, number) => sum + number, 0);
    console.log(`The sum of all matching numbers is ${sum}`);
  }

  override solvePart2(): void {
    const sums = this.inputData.map((line) =>
      this.getSumOfMatchingNumbersNumericOrWord(line)
    );
    const sum = sums.reduce((sum, number) => sum + number, 0);
    console.log(`The sum of all matching numbers is ${sum}`);
  }
}
