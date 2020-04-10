import House from "./House.js";
import HouseValidator from "./validators/HouseValidator.js";
class HouseBuilder {
    constructor() {
        this.reset();
    }
    reset() {
        this.house = new House();
    }
    setFoundationType(foundationType) {
        this.house.setFoundationType(foundationType);
        return this;
    }
    setRoofType(roofType) {
        this.house.setRoofType(roofType);
        return this;
    }
    setFloors(floors) {
        this.house.setFloors(floors);
        return this;
    }
    setEntrances(entrances) {
        this.house.setEntrances(entrances);
        return this;
    }
    setWindows(type, quantity) {
        this.house.setWindows(type, quantity);
        return this;
    }
    setDoors(type, quantity) {
        this.house.setDoors(type, quantity);
        return this;
    }
    build() {
        const result = new HouseValidator().validate(this.house);
        this.reset();
        return result;
    }
}
export default HouseBuilder;
