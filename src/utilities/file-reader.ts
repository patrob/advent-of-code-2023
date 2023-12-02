import * as fs from "fs";
import * as readline from "readline";

const readFile = async (filePath: string): Promise<string[]> => {
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
    });

    const lines: string[] = [];
    for await (const line of rl) {
        lines.push(line);
    }

    return lines;
};

export default readFile;
