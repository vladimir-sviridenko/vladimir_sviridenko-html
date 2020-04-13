import HouseBuilder from "../classes/HouseBuilder.js";
import HouseComplexPart from "../classes/HouseComplexPart.js";

interface IHouseBuilder {
  reset(): void;
  setFoundationType(foundationType: string): HouseBuilder;
  setRoofType(roofType: string): HouseBuilder;
  setWallType(wallType: string): HouseBuilder;
  setFloors(quantity: number): HouseBuilder;
  setEntrances(quantity: number): HouseBuilder;
  setWindows(windows: HouseComplexPart): HouseBuilder;
  setDoors(quantity: HouseComplexPart): HouseBuilder;
  build(): string;
}

export default IHouseBuilder;