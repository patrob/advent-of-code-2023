import Day01 from "./day01/day01";
import Day02 from "./day02/day02";
import Day03 from "./day03/day03";
import Day04 from "./day04/day04";
import Day05 from "./day05/day05";

const days = [new Day01(), new Day02(), new Day03(), new Day04(), new Day05()];

const runAll = async (last: boolean = false) => {
    if (!last) {
        for (const day of days) {
            await day.run();
        }
    } else {
        await days[days.length - 1].run();
    }
};

export default runAll;
