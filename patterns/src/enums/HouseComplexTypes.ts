const doorType = [
  "       ",
  " ┏━━━┓ ",
  " ┃   ┃ ",
  " ┃•  ┃ ",
  " ┃   ┃ "
]

const windowType = [
  "       ",
  " ╔═╦═╗ ",
  " ║ ╠═╣ ",
  " ╚═╩═╝ ",
]

const HouseComplexTypes =
{
  DOOR: doorType,
  WINDOW: windowType
}

Object.freeze(HouseComplexTypes);

export default HouseComplexTypes;