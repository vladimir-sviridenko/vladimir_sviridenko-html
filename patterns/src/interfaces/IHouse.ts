interface IHouse {
  getFoundationType(): string;
  setFoundationType(foundationType: string): void;

  getRoofType(): string;
  setRoofType(roofType: string): void;

  getFloors(): number;
  setFloors(floors: number): void;
  
  getEntrances(): number;
  setEntrances(entrances: number): void;

  getWindows(): {type: string, quantity: number};
  setWindows(type: string, quantity: number): void;

  getDoors(): {type: string, quantity: number};
  setDoors(type: string, quantity: number): void;
}

export default IHouse;