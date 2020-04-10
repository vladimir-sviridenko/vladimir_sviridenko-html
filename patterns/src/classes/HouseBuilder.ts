import House from "./House.js";
import HouseValidator from "./validators/HouseValidator.js";

import IHouseBuilder from "../interfaces/IHouseBuilder.js";

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
  setFloors(floors: number): HouseBuilder {
    this.house.setFloors(floors);
    return this;
  }
  setEntrances(entrances: number): HouseBuilder {
    this.house.setEntrances(entrances);
    return this;
  }
  setWindows(type: string, quantity: number): HouseBuilder {
    this.house.setWindows(type, quantity);
    return this;
  }
  setDoors(type: string, quantity: number): HouseBuilder {
    this.house.setDoors(type, quantity);
    return this;
  }
  build(): House {
    const result = new HouseValidator().validate(this.house);
    this.reset();
    return result;
  }
}

export default HouseBuilder;