import Day01 from "./day01/day01";
import Day02 from "./day02/day02";

const days = [new Day01(), new Day02()];

const runAll = async () => {
    for (const day of days) {
        await day.run();
    }
};

export default runAll;
