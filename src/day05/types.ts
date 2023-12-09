import { withinRange } from "../utilities/numbers";

export const testData = [
    "seeds: 79 14 55 13",
    "",
    "seed-to-soil map:",
    "50 98 2",
    "52 50 48",
    "",
    "soil-to-fertilizer map:",
    "0 15 37",
    "37 52 2",
    "39 0 15",
    "",
    "fertilizer-to-water map:",
    "49 53 8",
    "0 11 42",
    "42 0 7",
    "57 7 4",
    "",
    "water-to-light map:",
    "88 18 7",
    "18 25 70",
    "",
    "light-to-temperature map:",
    "45 77 23",
    "81 45 19",
    "68 64 13",
    "",
    "temperature-to-humidity map:",
    "0 69 1",
    "1 0 69",
    "",
    "humidity-to-location map:",
    "60 56 37",
    "56 93 4",
];

export type ConversionFactor = { dest: number; src: number; range: number };

export type Conversion = {
    from: string;
    to: string;
    conversionFactors: ConversionFactor[];
};

export type ConversionMap = {
    seeds: number[];
    conversions: Conversion[];
};

export const parseConversion = (lines: string[]): Conversion => {
    const [from, to] = lines[0].split(" ")[0].split("-to-");
    const conversionFactors = lines.slice(1).map((line) => {
        const [dest, src, range] = line.split(" ").map((n) => parseInt(n));
        return { dest, src, range };
    });
    return { from, to, conversionFactors };
};

export const parseConversions = (lines: string[]): Conversion[] => {
    const conversions: Conversion[] = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/\d+/g) || lines[i].length === 0) {
            continue;
        }
        const remainingLines = lines.slice(i);
        const end =
            remainingLines.indexOf("") > 0
                ? remainingLines.indexOf("")
                : remainingLines.length + 1;
        const conversionLines = remainingLines.slice(0, end);
        conversions.push(parseConversion(conversionLines));
        i += conversionLines.length;
    }
    return conversions;
};

export const parseSeeds = (lines: string[]): number[] => {
    return lines[0]
        .split(" ")
        .slice(1)
        .map((line) => parseInt(line));
};

export const parseMap = (lines: string[]): ConversionMap => {
    const seeds = parseSeeds(lines);
    const conversions = parseConversions(lines.slice(2));
    return { conversions, seeds };
};

export const convert = (src: number, conversion: Conversion): number => {
    const conversionFactor = conversion.conversionFactors.find((c) =>
        withinRange(src, c.src, c.range)
    );
    if (conversionFactor) {
        return conversionFactor.dest + (src - conversionFactor.src);
    }
    return src;
};

export const convertAll = (src: number, conversions: Conversion[]): number => {
    let conversion = conversions.find((c) => c.from === "seed");
    let converted = src;
    while (conversion) {
        converted = convert(converted, conversion);
        conversion = conversions.find((c) => c.from === conversion?.to);
    }
    return converted;
};
