import HouseBuilder from "./HouseBuilder.js";
import ValidationError from "./errors/ValidationError.js";
import HouseComplexPart from "./HouseComplexPart.js";
import HouseComplexTypes from "../enums/HouseComplexTypes.js";
class HouseDirector {
    constructor() {
        this.houseBuilder = new HouseBuilder();
    }
    ;
    createDefaultHouse() {
        let defaultHouse = this.houseBuilder.build();
        return defaultHouse;
    }
    createBigHouse() {
        let superHouse = this.houseBuilder
            .setRoofType("░")
            .setFoundationType("▒")
            .setFloors(5)
            .setEntrances(5)
            .setWindows(new HouseComplexPart(HouseComplexTypes.WINDOW, 65))
            .setDoors(new HouseComplexPart(HouseComplexTypes.DOOR, 10))
            .build();
        return superHouse;
    }
    createSampleHouse() {
        let superHouse = this.houseBuilder
            .setRoofType("░")
            .setFoundationType("▒")
            .setFloors(2)
            .setEntrances(1)
            .setWindows(new HouseComplexPart(HouseComplexTypes.WINDOW, 3))
            .setDoors(new HouseComplexPart(HouseComplexTypes.DOOR, 1))
            .build();
        return superHouse;
    }
    createMiddleHouse() {
        let superHouse = this.houseBuilder
            .setRoofType("░")
            .setFoundationType("M")
            .setFloors(4)
            .setEntrances(4)
            .setWindows(new HouseComplexPart(HouseComplexTypes.WINDOW, 44))
            .setDoors(new HouseComplexPart(HouseComplexTypes.DOOR, 4))
            .build();
        return superHouse;
    }
    createInvalidHouse() {
        console.log("Creating house with 0 floors...");
        let invalidHouse;
        try {
            invalidHouse = this.houseBuilder.setFloors(0).build();
        }
        catch (error) {
            this.houseBuilder.reset();
            if (error instanceof ValidationError) {
                console.log("%cError: " + error.message, "color: red");
                console.log("%cBuilder was failed!", "color: red");
                this.houseBuilder.reset();
            }
            else {
                throw error;
            }
        }
        return invalidHouse;
    }
}
export default HouseDirector;
