export type GridValue = {
    value: string;
    rowIndex: number;
    columnIndex: number;
};

export type PartNumber = {
    value: string;
    rowIndex: number;
    columnIndex: number;
};

export const parseNumbers = (input: string): RegExpMatchArray | string[] => {
    return input.match(/\d+/g) ?? [];
};

export const parseNumbersRow = (row: number, input: string): GridValue[] => {
    let mutableInput = `${input}`;
    return parseNumbers(input).map((partNumber, index) => {
        if (
            mutableInput.indexOf(partNumber) !==
                mutableInput.lastIndexOf(partNumber) &&
            index > 0
        ) {
            mutableInput =
                mutableInput.slice(0, mutableInput.indexOf(partNumber) + 1) +
                Array(partNumber.length).reduce((acc) => acc + ".", "") +
                mutableInput.slice(
                    mutableInput.indexOf(partNumber) + 1 + partNumber.length
                );
        }
        return {
            value: partNumber,
            rowIndex: row,
            columnIndex: mutableInput.indexOf(partNumber),
        };
    });
};

export const parseSpecialCharacters = (
    input: string
): RegExpMatchArray | string[] => {
    return input.match(/[\*\+=%\-#@/&\$]{1,1}/g) ?? [];
};

export const parseSpecialCharactersRow = (
    row: number,
    input: string
): GridValue[] => {
    let mutableInput = `${input}`;
    return parseSpecialCharacters(input).map((specialChar, index) => {
        if (
            mutableInput.indexOf(specialChar) !==
                mutableInput.lastIndexOf(specialChar) &&
            index > 0
        ) {
            mutableInput =
                mutableInput.slice(0, mutableInput.indexOf(specialChar) + 1) +
                Array(specialChar.length).reduce((acc) => acc + ".", "") +
                mutableInput.slice(
                    mutableInput.indexOf(specialChar) + 1 + specialChar.length
                );
        }
        return {
            value: specialChar,
            rowIndex: row,
            columnIndex: mutableInput.indexOf(specialChar),
        };
    });
};

const withinRange = (index: number, start: number, length: number): boolean => {
    return index >= start && index <= start + length;
};

export const isAdjacent = (
    specialChar: GridValue,
    partNumber: GridValue
): boolean => {
    const specRow = specialChar.rowIndex;
    const specCol = specialChar.columnIndex;
    const partRow = partNumber.rowIndex;
    const partCol = partNumber.columnIndex;
    const partLen = partNumber.value.length;
    return (
        specRow >= partRow - 1 &&
        specRow <= partRow + 1 &&
        withinRange(specCol, partCol - 1, partLen + 1)
    );
};

export const getValidPartNumbers = (input: string[]): string[] => {
    const partNumbers = input
        .map((line, i) => parseNumbersRow(i, line))
        .filter((pn) => pn.length > 0)
        .flat();
    const specialChars = input
        .map((line, i) => parseSpecialCharactersRow(i, line))
        .filter((sc) => sc.length > 0)
        .flat();

    return partNumbers.reduce<string[]>(
        (acc, part) =>
            specialChars.filter((sc) => isAdjacent(sc, part)).length
                ? [...acc, part.value]
                : [...acc],
        []
    );
};

export const isNumeric = (input: string): boolean => {
    return /\d/.test(input);
};

export const getFromPattern = (
    input: string[],
    isNumber: boolean
): GridValue[] => {
    return input
        .map((line, i) => {
            const lineValues: GridValue[] = [];
            for (let c = 0; c < line.length; c++) {
                if (line[c] === ".") {
                    continue;
                }
                if (isNumber && isNumeric(line[c])) {
                    let partNumber = line[c];
                    for (
                        let j = c + 1;
                        line[j] !== "." &&
                        isNumeric(line[j]) &&
                        j < line.length;
                        j++
                    ) {
                        partNumber += line[j];
                    }
                    lineValues.push({
                        rowIndex: i,
                        columnIndex: c,
                        value: partNumber,
                    });
                    c += partNumber.length - 1;
                }
                if (!isNumber && /[^\d\.]{1,1}/g.test(line[c])) {
                    lineValues.push({
                        rowIndex: i,
                        columnIndex: c,
                        value: line[c],
                    });
                }
            }
            return lineValues;
        })
        .flat();
};

export const isGear = (specialChar: GridValue, parts: GridValue[]): boolean => {
    return (
        specialChar.value === "*" &&
        parts.filter((p) => isAdjacent(specialChar, p)).length === 2
    );
};

export const getGearPartNumbers = (
    specialChar: GridValue,
    parts: GridValue[]
): number[] => {
    return parts
        .filter((p) => isAdjacent(specialChar, p))
        .map((p) => Number(p.value));
};

export const getValidPartNumbers2 = (input: string[]): string[] => {
    const partNumbers = getFromPattern(input, true);
    const specialChars = getFromPattern(input, false);

    return partNumbers.reduce<string[]>(
        (acc, part) =>
            specialChars.filter((sc) => isAdjacent(sc, part)).length
                ? [...acc, part.value]
                : [...acc],
        []
    );
};

export const sumValidPartNumbers = (partNumbers: string[]): number => {
    return partNumbers.reduce((acc, part, i) => acc + Number(part), 0);
};

export const getSumOfValidPartNumbers = (input: string[]): number => {
    const partNumbers = getValidPartNumbers2(input);
    return sumValidPartNumbers(partNumbers);
};

export const getSumOfGearRatios = (input: string[]): number => {
    const partNumbers = getFromPattern(input, true);
    const specialChars = getFromPattern(input, false);

    return specialChars
        .filter((sc) => isGear(sc, partNumbers))
        .map((sc) => getGearPartNumbers(sc, partNumbers))
        .map((partNumbers) =>
            partNumbers.reduce((acc, current) => acc * current, 1)
        )
        .reduce((acc, current) => acc + current, 0);
};
