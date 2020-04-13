import HousePart from "../classes/HousePart.js";
let doorModel = [
    ["       "],
    [" ┏━━━┓ "],
    [" ┃   ┃ "],
    [" ┃’  ┃ "],
    [" ┖───┚ "]
];
let windowModel = [
    ["       "],
    [" ╔═╦═╗ "],
    [" ║ ╠═╣ "],
    [" ╚═╩═╝ "],
    ["       "]
];
let HouseParts = {
    DOOR: new HousePart(doorModel),
    WINDOW: new HousePart(windowModel)
};
Object.freeze(HouseParts);
export default HouseParts;
