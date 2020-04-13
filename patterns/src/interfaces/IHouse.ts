import HouseComplexPart from "../classes/HouseComplexPart";

interface IHouse {
  getFoundationType(): string;
  setFoundationType(foundationType: string): void;

  getWallType(): string;
  setWallType(wallType: string): void;

  getRoofType(): string;
  setRoofType(roofType: string): void;

  getFloors(): number;
  setFloors(quantity: number): void;
  
  getEntrances(): number;
  setEntrances(quantity: number): void;

  getWindows(): HouseComplexPart;
  setWindows(windows: HouseComplexPart): void;

  getDoors(): HouseComplexPart;
  setDoors(doors: HouseComplexPart): void;
}

export default IHouse;