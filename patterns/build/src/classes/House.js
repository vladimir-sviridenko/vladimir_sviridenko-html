import StringValidator from "./validators/StringValidator.js";
import NumberValidator from "./validators/NumberValidator.js";
class House {
    constructor() {
        this.setFoundationType("Default");
        this.setRoofType("Default");
        this.setFloors(5);
        this.setEntrances(1);
        this.setWindows("Default", 5);
        this.setDoors("Default", 1);
    }
    getFoundationType() {
        return this.foundationType;
    }
    setFoundationType(foundationType) {
        this.foundationType = new StringValidator().validate(foundationType);
    }
    getRoofType() {
        return this.roofType;
    }
    setRoofType(roofType) {
        this.roofType = new StringValidator().validate(roofType);
    }
    getFloors() {
        return this.floors;
    }
    setFloors(floors) {
        this.floors = new NumberValidator().validate(floors);
    }
    getEntrances() {
        return this.entrances;
    }
    setEntrances(entrances) {
        this.entrances = new NumberValidator().validate(entrances);
    }
    getWindows() {
        return this.windows;
    }
    setWindows(type, quantity) {
        type = new StringValidator().validate(type);
        quantity = new NumberValidator().validate(quantity);
        this.windows = { type, quantity };
    }
    getDoors() {
        return this.doors;
    }
    setDoors(type, quantity) {
        type = new StringValidator().validate(type);
        quantity = new NumberValidator().validate(quantity);
        this.doors = { type, quantity };
    }
    toString() {
        let houseToString = `    Foundation Type: ${this.foundationType}
    Roof Type: ${this.roofType}
    Floors: ${this.floors}
    Entrances: ${this.entrances}
    WindowsType: ${this.windows.type}
    WindowsQuantity: ${this.windows.quantity}
    DoorsType: ${this.doors.type}
    DoorsQuantity: ${this.doors.quantity}`;
        return houseToString;
    }
}
export default House;
