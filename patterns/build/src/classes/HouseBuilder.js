import House from "./House.js";
import HouseStringConverter from "./HouseStringConverter.js";
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
    setWallType(wallType) {
        this.house.setWallType(wallType);
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
    setWindows(windows) {
        this.house.setWindows(windows);
        return this;
    }
    setDoors(doors) {
        this.house.setDoors(doors);
        return this;
    }
    build() {
        const houseString = new HouseStringConverter(this.house).convert();
        this.reset();
        return houseString;
    }
}
export default HouseBuilder;
