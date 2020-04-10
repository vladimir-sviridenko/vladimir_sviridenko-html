import StringValidator from "./validators/StringValidator.js";
import NumberValidator from "./validators/NumberValidator.js";

import IHouse from "../interfaces/IHouse.js";

class House implements IHouse {
  private foundationType: string;
  private roofType: string;
  private floors: number;
  private entrances: number;
  private windows: { type: string; quantity: number; };
  private doors: { type: string; quantity: number; };

  constructor() {
    this.setFoundationType("Default");
    this.setRoofType("Default");
    this.setFloors(5);
    this.setEntrances(1);
    this.setWindows("Default", 5);
    this.setDoors("Default", 1);
  }

  getFoundationType(): string {
    return this.foundationType;
  }
  setFoundationType(foundationType: string): void {
    this.foundationType = new StringValidator().validate(foundationType);
  }
  getRoofType(): string {
    return this.roofType;
  }
  setRoofType(roofType: string): void {
    this.roofType = new StringValidator().validate(roofType);
  }
  getFloors(): number {
    return this.floors;
  }
  setFloors(floors: number): void {
    this.floors = new NumberValidator().validate(floors);
  }
  getEntrances(): number {
    return this.entrances;
  }
  setEntrances(entrances: number): void {
    this.entrances = new NumberValidator().validate(entrances);
  }
  getWindows(): { type: string; quantity: number; } {
    return this.windows;
  }
  setWindows(type: string, quantity: number): void {
    type = new StringValidator().validate(type);
    quantity = new NumberValidator().validate(quantity);
    this.windows = { type, quantity };
  }
  getDoors(): { type: string; quantity: number; } {
    return this.doors;
  }
  setDoors(type: string, quantity: number): void {
    type = new StringValidator().validate(type);
    quantity = new NumberValidator().validate(quantity);
    this.doors = { type, quantity };
  }

  toString() {
    let houseToString = 
`    Foundation Type: ${this.foundationType}
    Roof Type: ${this.roofType}
    Floors: ${this.floors}
    Entrances: ${this.entrances}
    WindowsType: ${this.windows.type}
    WindowsQuantity: ${this.windows.quantity}
    DoorsType: ${this.doors.type}
    DoorsQuantity: ${this.doors.quantity}`;
    return houseToString;
  }
}

export default House;