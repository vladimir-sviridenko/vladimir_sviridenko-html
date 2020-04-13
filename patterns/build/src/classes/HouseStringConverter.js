import HouseValidator from "./validators/HouseValidator.js";
class HouseStringConverter {
    constructor(house) {
        this.setHouse(house);
    }
    convert() {
        this.initializeHouseMatrix(this.calculateHouseSize());
        if (this.house.getEntrances() > 1) {
            this.addEntrances();
        }
        this.addDoors();
        this.addWindows();
        const houseString = this.createRoof() + this.matrixToString();
        return houseString;
    }
    initializeHouseMatrix({ houseWidth, houseHeight }) {
        this.matrix = [];
        for (let y = 0; y <= houseHeight; y++) {
            this.matrix.push([]);
            for (let x = 0; x <= houseWidth; x++) {
                if (y === houseHeight) {
                    this.matrix[y][x] = this.house.getFoundationType();
                }
                else if (x === 0 || x === houseWidth) {
                    this.matrix[y][x] = this.house.getWallType();
                }
                else {
                    this.matrix[y][x] = "×";
                }
            }
        }
    }
    matrixToString() {
        let houseString = "";
        for (let y = 0; y <= this.matrix.length - 1; y++) {
            for (let x = 0; x <= this.matrix[y].length - 1; x++) {
                if (this.matrix[y][x] === "×") {
                    houseString += " ";
                }
                else if (this.matrix[y][x] === "+") {
                    houseString += " ";
                }
                else {
                    houseString += this.matrix[y][x];
                }
            }
            houseString += "\n";
        }
        return houseString;
    }
    createRoof() {
        let roof = "";
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
    addEntrances() {
        const addEntrance = () => {
            for (let y = 0; y < this.matrix.length - 1; y++) {
                this.matrix[y][entranceLineX] = "+";
            }
        };
        let entrances = this.house.getEntrances();
        let entranceWidth = Math.floor(this.matrix[0].length / entrances);
        let entranceLineX = entranceWidth;
        for (let i = 1; i < entrances; i++) {
            addEntrance();
            entranceLineX += entranceWidth;
        }
    }
    addDoors() {
        const addDoor = () => {
            for (let x = 0; x <= door.getWidth() - 1; x++) {
                for (let y = door.getHeight() - 1; y >= 0; y--) {
                    this.matrix[this.matrix.length - 2 - y][doorPositionX] = door.getModel()[door.getHeight() - 1 - y][x];
                }
                doorPositionX++;
            }
        };
        const door = this.house.getDoors();
        let doorOnEntrance = Math.ceil(door.getQuantity() / this.house.getEntrances());
        let restDoors = door.getQuantity() - doorOnEntrance * this.house.getEntrances();
        let currentDoorOnEntrance = 0;
        let doorPositionX = 1;
        for (let i = 0; i < door.getQuantity(); i++) {
            addDoor();
            currentDoorOnEntrance++;
            if (i == door.getQuantity() + restDoors) {
                doorOnEntrance--;
            }
            const newX = this.matrix[0].indexOf("+", doorPositionX) + 1;
            if (doorOnEntrance == currentDoorOnEntrance && this.matrix[this.matrix.length - 2][newX] != undefined) {
                doorPositionX = newX;
                currentDoorOnEntrance = 0;
            }
        }
    }
    addWindows() {
        const addWindow = () => {
            for (let x = 0; x <= window.getWidth() - 1; x++) {
                for (let y = 0; y <= window.getHeight() - 1; y++) {
                    this.matrix[windowPositionY + y][windowPositionX] = window.getModel()[y][x];
                }
                windowPositionX++;
            }
        };
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
    reset() {
        this.matrix = [];
    }
    setHouse(house) {
        this.house = new HouseValidator().validate(house);
        this.reset();
    }
    calculateHouseSize() {
        let entranceWindows = Math.ceil(this.house.getWindows().getQuantity() / this.house.getEntrances());
        let entranceDoors = Math.ceil(this.house.getDoors().getQuantity() / this.house.getEntrances());
        const restEntranceWindows = this.house.getWindows().getQuantity() -
            entranceWindows * (this.house.getEntrances() - 1);
        const restEntranceDoors = this.house.getDoors().getQuantity() -
            entranceDoors * (this.house.getEntrances() - 1);
        const entranceSize = this.calculateEntranceSize(entranceWindows, entranceDoors);
        const restEntranceSize = this.calculateEntranceSize(restEntranceWindows, restEntranceDoors);
        return {
            houseWidth: entranceSize.width * (this.house.getEntrances() - 1) +
                restEntranceSize.width + this.house.getEntrances(),
            houseHeight: Math.max(entranceSize.height, restEntranceSize.height),
        };
    }
    calculateEntranceSize(windows, doors) {
        let windowsPerFloor = Math.ceil(windows / this.house.getFloors());
        let restWindows = windows - windowsPerFloor * (this.house.getFloors() - 1);
        let windowsWidth = windowsPerFloor * this.house.getWindows().getWidth();
        let restWindowsWidth = restWindows * this.house.getWindows().getWidth();
        let doorsWidth = doors * this.house.getDoors().getWidth();
        const width = Math.max(windowsWidth, restWindowsWidth + doorsWidth);
        const height = Math.max(this.house.getDoors().getHeight(), this.house.getWindows().getHeight()) +
            (this.house.getFloors() - 1) * this.house.getWindows().getHeight();
        return { width, height };
    }
}
export default HouseStringConverter;
