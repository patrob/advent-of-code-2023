import { withinRange } from "../utilities/numbers";

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
