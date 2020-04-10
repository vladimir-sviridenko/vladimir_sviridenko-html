import HouseDirector from "./src/classes/HouseDirector.js";
let houseDirector = new HouseDirector();
console.log("%cDefault House: ", "color: green");
console.log(houseDirector.createDefaultHouse().toString());
console.log("%cSuper House: ", "color: green");
console.log(houseDirector.createSuperHouse().toString());
console.log("%cInvalid House: ", "color: green");
houseDirector.createInvalidHouse();
