import House from "./House.js";

import HouseValidator from "./validators/HouseValidator.js";
import HouseComplexPart from "./HouseComplexPart.js";

class HouseStringConverter {
  private house: House;
  private matrix: Array<Array<string>>;

  constructor(house: House) {
    this.setHouse(house);
  }

  public convert(): string {
    this.initializeHouseMatrix(this.calculateHouseSize());


    if (this.house.getEntrances() > 1) {
      this.addEntrances();
    }
    this.addDoors();
    this.addWindows();

    const houseString = this.createRoof() + this.matrixToString()

    return houseString;
  }

  private initializeHouseMatrix({ houseWidth, houseHeight }: { houseWidth: number, houseHeight: number }) {
    this.matrix = [];
    for (let y = 0; y <= houseHeight; y++) {
      this.matrix.push([]);
      for (let x = 0; x <= houseWidth; x++) {
        if (y === houseHeight) {
          this.matrix[y][x] = this.house.getFoundationType();
        } else if (x === 0 || x === houseWidth) {
          this.matrix[y][x] = this.house.getWallType();
        } else {
          this.matrix[y][x] = "×";
        }
      }
    }
  }

  private matrixToString(): string {
    let houseString = "";

    for (let y = 0; y <= this.matrix.length - 1; y++) {
      for (let x = 0; x <= this.matrix[y].length - 1; x++) {
        if (this.matrix[y][x] === "×") {
          houseString += " "
        } else {
          houseString += this.matrix[y][x];
        }
      }
      houseString += "\n";
    }

    return houseString;
  }

  private createRoof(): string {
    let roof: string = "";
    const width = this.matrix[0].length;
    const height = width / 2;
    let spaces = 0;
    let roofParts = "";

    const step = this.house.getFloors() === 1 ? 2 : this.house.getFloors();
    for (let i = height; i >= 0; i -= step) {

      for (let j = 1; j <= i - 1; j++) {
        spaces++;
      }

      for (let j = i - 1; j < width - spaces; j++) {
        roofParts += this.house.getRoofType();
      }

      roof += " ".repeat(spaces) + roofParts + " ".repeat(spaces) + "\n";
      spaces = 0;
      roofParts = "";
    }


    return roof;
  }

  private addEntrances(): void {
    const addEntrance = () => {
      for (let y = 0; y < this.matrix.length - 1; y++) {
        this.matrix[y][entranceLineX] = this.house.getWallType();
      }
    }
    let entrances = this.house.getEntrances();
    let entranceWidth = Math.floor(this.matrix[0].length / entrances);
    let entranceLineX = entranceWidth;
    for (let i = 1; i < entrances; i++) {
      addEntrance();
      entranceLineX += entranceWidth;
    }
  }

  private addDoors(): void {
    const addDoor = () => {
      for (let x = 0; x <= door.getWidth() - 1; x++) {
        for (let y = door.getHeight() - 1; y >= 0; y--) {
          this.matrix[this.matrix.length - 2 - y][doorPositionX] = door.getModel()[door.getHeight() - 1 - y][x];
        }
        doorPositionX++;
      }
    }

    const door = this.house.getDoors();
    const doorOnEntrance = Math.floor(door.getQuantity() / this.house.getEntrances());
    let currentDoorOnEntrance = 0;
    let doorPositionX = 1;
    for (let i = 0; i < door.getQuantity(); i++) {
      addDoor();
      currentDoorOnEntrance++;

      const newX = this.matrix[0].indexOf(this.house.getWallType(), doorPositionX) + 1
      if (doorOnEntrance == currentDoorOnEntrance && this.matrix[this.matrix.length - 2][newX] != undefined) {
        doorPositionX = newX;
        currentDoorOnEntrance = 0;
      }
    }
  }

  private addWindows(): void {
    const addWindow = () => {
      for (let x = 0; x <= window.getWidth() - 1; x++) {
        for (let y = 0; y <= window.getHeight() - 1; y++) {
          this.matrix[windowPositionY + y][windowPositionX] = window.getModel()[y][x];
        }
        windowPositionX++;
      }
    }

    const window = this.house.getWindows();
    let windowPositionX = 1;
    let windowPositionY = 0;
    const entrances = this.house.getEntrances();
    const windowsOnFloor = Math.floor(this.matrix[0].length / window.getWidth());

    const windowsOnEntranceFloor = Math.floor(windowsOnFloor / entrances);
    const windowsOnEntrance = Math.ceil(window.getQuantity() / entrances);
    const entranceWidth = Math.floor(this.matrix[0].length / entrances);
    let currentWindowsOnEntrance = 0;
    let currentWindowsOnEntranceFloor = 0;
    let currentEntranceX = 1;
    for (let i = 0; i < window.getQuantity(); i++) {
      if (this.matrix[windowPositionY][windowPositionX] !== "×") {
        windowPositionX = this.matrix[windowPositionY].indexOf("×", windowPositionX);
      }
      addWindow();
      currentWindowsOnEntranceFloor++;
      currentWindowsOnEntrance++;
      if (currentWindowsOnEntranceFloor == windowsOnEntranceFloor) {
        windowPositionY += window.getHeight();
        windowPositionX = currentEntranceX;
        currentWindowsOnEntranceFloor = 0;
      }
      if (currentWindowsOnEntrance == windowsOnEntrance) {
        currentWindowsOnEntranceFloor = 0;
        currentWindowsOnEntrance = 0;
        currentEntranceX += entranceWidth;
        windowPositionY = 0;
        windowPositionX = currentEntranceX;
      }
    }
  }

  private reset() {
    this.matrix = [];
  }

  private setHouse(house: House) {
    this.house = new HouseValidator().validate(house);
    this.reset();
  }

  private calculateHouseSize(): { houseWidth: number, houseHeight: number } {
    let houseWidth = 0;
    let houseHeight = 0;

    const doorWidth = this.house.getDoors().getWidth();
    const windowWidth = this.house.getWindows().getWidth();
    const houseFloors = this.house.getFloors();

    let allDoorsWidth = doorWidth * this.house.getDoors().getQuantity();
    let allWindowsWidth = windowWidth * this.house.getWindows().getQuantity();

    houseWidth = (allDoorsWidth + allWindowsWidth) / houseFloors;
    if ((houseWidth ^ 0) !== houseWidth) {
      houseWidth = Math.ceil(houseWidth) + this.house.getWindows().getWidth();
    }
    const doorHeight = this.house.getDoors().getHeight();
    const windowHeight = this.house.getWindows().getHeight()
    if (houseFloors === 1) {
      houseHeight = Math.max(this.house.getWindows().getHeight(), this.house.getDoors().getHeight());
      houseWidth += this.house.getEntrances();
    } else {
      houseHeight = doorHeight + (windowHeight * (houseFloors - 1));
      houseWidth += this.house.getEntrances() * 4;
    }

    return { houseWidth, houseHeight };
  }
}

export default HouseStringConverter;