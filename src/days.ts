import { Day } from "./day";
import { day01 } from "./day01";
import { day02 } from "./day02";

const days: Day[] = [day01, day02];

export const runAll = async () => {
    for (const day of days) {
        await day.run();
    }
};
