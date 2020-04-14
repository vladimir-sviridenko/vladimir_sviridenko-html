import TypeValidator from "./validators/TypeValidator.js";
import QuantityValidator from "./validators/QuantityValidator.js";
import ComplexPartValidator from "./validators/ComplexPartValidator.js";
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
    const newValue = new TypeValidator().validate(foundationType);
    this.foundationType = newValue ? newValue : this.wallType;
  }

  getWallType(): string {
    return this.wallType;
  }

  setWallType(wallType: string): void {
    const newValue = new TypeValidator().validate((wallType));
    this.wallType = newValue ? newValue : this.wallType;
  }

  getRoofType(): string {
    return this.roofType;
  }
  setRoofType(roofType: string): void {
    const newValue = new TypeValidator().validate(roofType);
    this.roofType = newValue ? newValue : this.roofType;
  }
  getFloors(): number {
    return this.floors;
  }
  setFloors(floors: number): void {
    const newValue = new QuantityValidator().validate(floors);
    this.floors = newValue ? newValue : this.floors;
  }
  getEntrances(): number {
    return this.entrances;
  }
  setEntrances(entrances: number): void {
    const newValue = new QuantityValidator().validate(entrances);
    this.entrances = newValue ? newValue : this.entrances;
  }
  getWindows(): HouseComplexPart {
    return this.windows;
  }
  setWindows(windows: HouseComplexPart): void {
    const newValue = new ComplexPartValidator().validate(windows);
    this.windows = newValue ? newValue : this.windows;
  }
  getDoors(): HouseComplexPart  {
    return this.doors;
  }
  setDoors(doors: HouseComplexPart): void {
    const newValue = new ComplexPartValidator().validate(doors);
    this.doors = newValue ? newValue : this.doors;
  }
}

export default House;