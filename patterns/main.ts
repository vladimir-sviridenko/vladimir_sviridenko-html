import HouseDirector from "./src/classes/HouseDirector.js";

let houseDirector = new HouseDirector();

console.log("%cDefault House: ", "color: green")
console.log(houseDirector.createDefaultHouse());

console.log("%cSample House: ", "color: green")
console.log(houseDirector.createSampleHouse());

console.log("%cBig House: ", "color: green")
console.log(houseDirector.createBigHouse());

console.log("%cMiddle House: ", "color: green")
console.log(houseDirector.createMiddleHouse());

console.log("%cInvalid House: ", "color: green")
houseDirector.createInvalidHouse();