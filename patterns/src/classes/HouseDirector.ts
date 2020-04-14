import House from "./House.js";
import HouseBuilder from "./HouseBuilder.js";
import ValidationError from "./errors/ValidationError.js";
import HouseComplexPart from "./HouseComplexPart.js";
import HouseComplexTypes from "../enums/HouseComplexTypes.js";

class HouseDirector {
  private houseBuilder: HouseBuilder = new HouseBuilder();;

  public createDefaultHouse(): string {
    let defaultHouse = this.houseBuilder.build();
    return defaultHouse;
  }

  public createBigHouse(): string {
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

  public createSampleHouse(): string {
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

  public createMiddleHouse(): string {
    let superHouse = this.houseBuilder
      .setRoofType("░")
      .setFoundationType("▒")
      .setFloors(4)
      .setEntrances(4)
      .setWindows(new HouseComplexPart(HouseComplexTypes.WINDOW, 44))
      .setDoors(new HouseComplexPart(HouseComplexTypes.DOOR, 4))
      .build();
    return superHouse;
  }

  public createInvalidHouse(): string {
    console.log("Try to creat house with -10 floors, NaN doors and null wallTypes...");
    console.log("Create house with default floors...");
    let invalidHouse: string;
    invalidHouse = this.houseBuilder
    .setFloors(-10)
    .setFloors(NaN)
    .setDoors(new HouseComplexPart(HouseComplexTypes.DOOR, NaN))
    .setDoors(new HouseComplexPart(HouseComplexTypes.DOOR, 2))
    .setWindows(null)
    .setWallType(null)
    .build();
    return invalidHouse;
  }
}

export default HouseDirector;