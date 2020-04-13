import House from "./House.js";
import HouseStringConverter from "./HouseStringConverter.js";

import IHouseBuilder from "../interfaces/IHouseBuilder.js";
import HouseComplexPart from "./HouseComplexPart.js";

class HouseBuilder implements IHouseBuilder {
  private house: House;

  constructor() {
    this.reset()
  }

  reset(): void {
    this.house = new House();
  }
  setFoundationType(foundationType: string): HouseBuilder {
    this.house.setFoundationType(foundationType);
    return this;
  }
  setRoofType(roofType: string): HouseBuilder {
    this.house.setRoofType(roofType);
    return this;
  }
  setWallType(wallType: string): HouseBuilder {
    this.house.setWallType(wallType);
    return this;
  }
  setFloors(floors: number): HouseBuilder {
    this.house.setFloors(floors);
    return this;
  }
  setEntrances(entrances: number): HouseBuilder {
    this.house.setEntrances(entrances);
    return this;
  }
  setWindows(windows: HouseComplexPart): HouseBuilder {
    this.house.setWindows(windows);
    return this;
  }
  setDoors(doors: HouseComplexPart): HouseBuilder {
    this.house.setDoors(doors);
    return this;
  }
  build(): string {
    const houseString = new HouseStringConverter(this.house).convert();
    this.reset();
    return houseString;
  }
}

export default HouseBuilder;