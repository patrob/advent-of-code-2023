import Day01 from "./day01/day01";
import Day02 from "./day02/day02";
import Day03 from "./day03/day03";

const days = [new Day01(), new Day02(), new Day03()];

const runAll = async () => {
    for (const day of days) {
        await day.run();
    }
};

export default runAll;
