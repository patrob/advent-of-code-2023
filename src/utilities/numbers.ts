export const withinRange = (
    n: number,
    target: number,
    range: number
): boolean => {
    return n >= target && n <= target + range;
};
