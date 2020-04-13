let doorType=  [
  "       ",
  " ┏━━━┓ ",
  " ┃   ┃ ",
  " ┃•  ┃ ",
  " ┃   ┃ "
]

let windowType = [
  "       ",
  " ╔═╦═╗ ",
  " ║ ╠═╣ ",
  " ╚═╩═╝ ",
  "       "
]

let HouseComplexTypes =
{
  DOOR: doorType,
  WINDOW: windowType
}

Object.freeze(HouseComplexTypes);

export default HouseComplexTypes;