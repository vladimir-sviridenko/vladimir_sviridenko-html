import House from "../classes/House.js";
import HouseBuilder from "../classes/HouseBuilder.js";

interface IHouseBuilder {
  reset(): void;
  setFoundationType(foundationType: string): HouseBuilder;
  setRoofType(roofType: string): HouseBuilder;
  setFloors(floors: number): HouseBuilder;
  setEntrances(entrances: number): HouseBuilder;
  setWindows(type: string, quantity: number): HouseBuilder;
  setDoors(type: string, quantity: number): HouseBuilder;
  build(): House;
}

export default IHouseBuilder;