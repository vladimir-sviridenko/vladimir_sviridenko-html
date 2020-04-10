import House from "./House.js";
import HouseBuilder from "./HouseBuilder.js";
import ValidationError from "./errors/ValidationError.js";

class HouseDirector {
  private houseBuilder: HouseBuilder = new HouseBuilder();;

  public createDefaultHouse(): House {
    let defaultHouse = new House();
    return defaultHouse;
  }

  public createSuperHouse(): House {
    let superHouse = this.houseBuilder
    .setFoundationType("SuperF")
    .setFloors(40)
    .setRoofType("SuperR")
    .setEntrances(4)
    .setWindows("SuperW", 40)
    .setDoors("SuperD", 5)
    .build();
    return superHouse;
  }

  public createInvalidHouse(): House | null {
    console.log("Validation demonstration: ")
    console.log("Creating house with 0 floors...");
    let invalidHouse: House;
    try {
      invalidHouse = this.houseBuilder.setFloors(0).build();
    } catch(error) {
      this.houseBuilder.reset();
      if(error instanceof ValidationError) {
        console.log("%cError: " + error.message, "color: red");
        console.log("%cBuilder was failed!", "color: red");
        this.houseBuilder.reset();
      } else {
        throw error;
      }
    }

    console.log("Creating house without enough windows for living...");
    try {
      invalidHouse = this.houseBuilder
        .setWindows("Default", 4)
        .setFloors(50)
        .build();
    } catch(error) {
      this.houseBuilder.reset();
      if(error instanceof ValidationError) {
        console.log("%cError: " + error.message, "color: red");
        console.log("%cBuilder was failed!", "color: red");
      } else {
        throw error;
      }
    }
    console.log("Can't create InvalidHouse");
    return invalidHouse;
  }
}

export default HouseDirector;