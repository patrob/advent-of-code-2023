export type Color = "red" | "green" | "blue";

export type Round = {
    red: number;
    green: number;
    blue: number;
};

export type Game = {
    id: number;
    rounds: Round[];
};
