import TypeValidator from "./validators/TypeValidator.js";
import QuantityValidator from "./validators/QuantityValidator.js";
import HouseComplexTypes from "../enums/HouseComplexTypes.js";
import HouseComplexPart from "./HouseComplexPart.js";
class House {
    constructor() {
        this.setFoundationType("▒");
        this.setWallType("┃");
        this.setRoofType("░");
        this.setFloors(1);
        this.setEntrances(1);
        this.setWindows(new HouseComplexPart(HouseComplexTypes.WINDOW, 1));
        this.setDoors(new HouseComplexPart(HouseComplexTypes.DOOR, 1));
    }
    getFoundationType() {
        return this.foundationType;
    }
    setFoundationType(foundationType) {
        this.foundationType = new TypeValidator().validate(foundationType);
    }
    getWallType() {
        return this.wallType;
    }
    setWallType(wallType) {
        this.wallType = new TypeValidator().validate((wallType));
    }
    getRoofType() {
        return this.roofType;
    }
    setRoofType(roofType) {
        this.roofType = new TypeValidator().validate(roofType);
    }
    getFloors() {
        return this.floors;
    }
    setFloors(floors) {
        this.floors = new QuantityValidator().validate(floors);
    }
    getEntrances() {
        return this.entrances;
    }
    setEntrances(entrances) {
        this.entrances = new QuantityValidator().validate(entrances);
    }
    getWindows() {
        return this.windows;
    }
    setWindows(windows) {
        this.windows = windows;
    }
    getDoors() {
        return this.doors;
    }
    setDoors(doors) {
        this.doors = doors;
    }
}
export default House;
