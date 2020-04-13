import TypeValidator from "./validators/TypeValidator.js";
import QuantityValidator from "./validators/QuantityValidator.js";
import HouseComplexTypes from "../enums/HouseComplexTypes.js";
import HouseComplexPart from "./HouseComplexPart.js";

import IHouse from "../interfaces/IHouse.js";

class House implements IHouse {
  private foundationType: string;
  private wallType: string;
  private roofType: string;
  private floors: number;
  private entrances: number;
  private windows: HouseComplexPart;
  private doors: HouseComplexPart;

  constructor() {
    this.setFoundationType("▒");
    this.setWallType("┃");
    this.setRoofType("░");
    this.setFloors(1);
    this.setEntrances(1);
    this.setWindows(new HouseComplexPart(HouseComplexTypes.WINDOW, 1));
    this.setDoors(new HouseComplexPart(HouseComplexTypes.DOOR, 1));
  }

  getFoundationType(): string {
    return this.foundationType;
  }
  setFoundationType(foundationType: string): void {
    this.foundationType = new TypeValidator().validate(foundationType);
  }

  getWallType(): string {
    return this.wallType;
  }

  setWallType(wallType: string): void {
    this.wallType = new TypeValidator().validate((wallType));
  }

  getRoofType(): string {
    return this.roofType;
  }
  setRoofType(roofType: string): void {
    this.roofType = new TypeValidator().validate(roofType);
  }
  getFloors(): number {
    return this.floors;
  }
  setFloors(floors: number): void {
    this.floors = new QuantityValidator().validate(floors);
  }
  getEntrances(): number {
    return this.entrances;
  }
  setEntrances(entrances: number): void {
    this.entrances = new QuantityValidator().validate(entrances);
  }
  getWindows(): HouseComplexPart {
    return this.windows;
  }
  setWindows(windows: HouseComplexPart): void {
    this.windows = windows;
  }
  getDoors(): HouseComplexPart  {
    return this.doors;
  }
  setDoors(doors: HouseComplexPart): void {
    this.doors = doors;
  }
}

export default House;