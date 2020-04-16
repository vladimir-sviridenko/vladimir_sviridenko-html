define("src/classes/errors/ValidationError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }
    exports.default = ValidationError;
});
define("src/interfaces/IValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/classes/validators/TypeValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TypeValidator {
        validate(string) {
            let trimed = string ? string.trim() : null;
            if (trimed !== null && trimed !== "" && trimed.length === 1) {
                return trimed;
            }
            else {
                return null;
            }
        }
    }
    exports.default = TypeValidator;
});
define("src/classes/validators/QuantityValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class QuantityValidator {
        validate(quantity) {
            if (quantity > 0 && this.isInteger(quantity) && quantity != NaN) {
                return quantity;
            }
            else {
                return null;
            }
        }
        isInteger(number) {
            return (number ^ 0) === number;
        }
        ;
    }
    exports.default = QuantityValidator;
});
define("src/classes/HouseComplexPart", ["require", "exports", "src/classes/validators/QuantityValidator"], function (require, exports, QuantityValidator_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HouseComplexPart {
        constructor(model, quantity) {
            this.model = model;
            this.width = this.model[0].length;
            this.height = this.model.length;
            this.quantity = new QuantityValidator_js_1.default().validate(quantity);
        }
        getWidth() {
            return this.width;
        }
        getHeight() {
            return this.height;
        }
        getModel() {
            return this.model;
        }
        getQuantity() {
            return this.quantity;
        }
    }
    exports.default = HouseComplexPart;
});
define("src/classes/validators/ComplexPartValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ComplexPartValidator {
        validate(complexPart) {
            if (complexPart !== null) {
                return complexPart;
            }
            else {
                return null;
            }
        }
    }
    exports.default = ComplexPartValidator;
});
define("src/enums/HouseComplexTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let doorType = [
        "       ",
        " ┏━━━┓ ",
        " ┃   ┃ ",
        " ┃•  ┃ ",
        " ┃   ┃ "
    ];
    let windowType = [
        "       ",
        " ╔═╦═╗ ",
        " ║ ╠═╣ ",
        " ╚═╩═╝ ",
    ];
    let HouseComplexTypes = {
        DOOR: doorType,
        WINDOW: windowType
    };
    Object.freeze(HouseComplexTypes);
    exports.default = HouseComplexTypes;
});
define("src/interfaces/IHouse", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/classes/House", ["require", "exports", "src/classes/validators/TypeValidator", "src/classes/validators/QuantityValidator", "src/classes/validators/ComplexPartValidator", "src/enums/HouseComplexTypes", "src/classes/HouseComplexPart"], function (require, exports, TypeValidator_js_1, QuantityValidator_js_2, ComplexPartValidator_js_1, HouseComplexTypes_js_1, HouseComplexPart_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class House {
        constructor() {
            this.setFoundationType("▒");
            this.setWallType("┃");
            this.setRoofType("░");
            this.setFloors(1);
            this.setEntrances(1);
            this.setWindows(new HouseComplexPart_js_1.default(HouseComplexTypes_js_1.default.WINDOW, 1));
            this.setDoors(new HouseComplexPart_js_1.default(HouseComplexTypes_js_1.default.DOOR, 1));
        }
        getFoundationType() {
            return this.foundationType;
        }
        setFoundationType(foundationType) {
            const newValue = new TypeValidator_js_1.default().validate(foundationType);
            this.foundationType = newValue ? newValue : this.wallType;
        }
        getWallType() {
            return this.wallType;
        }
        setWallType(wallType) {
            const newValue = new TypeValidator_js_1.default().validate((wallType));
            this.wallType = newValue ? newValue : this.wallType;
        }
        getRoofType() {
            return this.roofType;
        }
        setRoofType(roofType) {
            const newValue = new TypeValidator_js_1.default().validate(roofType);
            this.roofType = newValue ? newValue : this.roofType;
        }
        getFloors() {
            return this.floors;
        }
        setFloors(floors) {
            const newValue = new QuantityValidator_js_2.default().validate(floors);
            this.floors = newValue ? newValue : this.floors;
        }
        getEntrances() {
            return this.entrances;
        }
        setEntrances(entrances) {
            const newValue = new QuantityValidator_js_2.default().validate(entrances);
            this.entrances = newValue ? newValue : this.entrances;
        }
        getWindows() {
            return this.windows;
        }
        setWindows(windows) {
            const newValue = new ComplexPartValidator_js_1.default().validate(windows);
            this.windows = newValue ? newValue : this.windows;
        }
        getDoors() {
            return this.doors;
        }
        setDoors(doors) {
            const newValue = new ComplexPartValidator_js_1.default().validate(doors);
            this.doors = newValue ? newValue : this.doors;
        }
    }
    exports.default = House;
});
define("src/classes/validators/HouseValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HouseValidator {
        validate(house) {
            const entrances = house.getEntrances();
            const doors = house.getDoors().getQuantity();
            if (entrances > doors) {
                house.setEntrances(doors);
            }
            return house;
        }
    }
    exports.default = HouseValidator;
});
define("src/classes/HouseStringConverter", ["require", "exports", "src/classes/validators/HouseValidator"], function (require, exports, HouseValidator_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.house = new HouseValidator_js_1.default().validate(house);
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
    exports.default = HouseStringConverter;
});
define("src/interfaces/IHouseBuilder", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/classes/HouseBuilder", ["require", "exports", "src/classes/House", "src/classes/HouseStringConverter"], function (require, exports, House_js_1, HouseStringConverter_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HouseBuilder {
        constructor() {
            this.reset();
        }
        reset() {
            this.house = new House_js_1.default();
        }
        setFoundationType(foundationType) {
            this.house.setFoundationType(foundationType);
            return this;
        }
        setRoofType(roofType) {
            this.house.setRoofType(roofType);
            return this;
        }
        setWallType(wallType) {
            this.house.setWallType(wallType);
            return this;
        }
        setFloors(floors) {
            this.house.setFloors(floors);
            return this;
        }
        setEntrances(entrances) {
            this.house.setEntrances(entrances);
            return this;
        }
        setWindows(windows) {
            this.house.setWindows(windows);
            return this;
        }
        setDoors(doors) {
            this.house.setDoors(doors);
            return this;
        }
        build() {
            const houseString = new HouseStringConverter_js_1.default(this.house).convert();
            this.reset();
            return houseString;
        }
    }
    exports.default = HouseBuilder;
});
define("src/classes/HouseDirector", ["require", "exports", "src/classes/HouseBuilder", "src/classes/HouseComplexPart", "src/enums/HouseComplexTypes"], function (require, exports, HouseBuilder_js_1, HouseComplexPart_js_2, HouseComplexTypes_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HouseDirector {
        constructor() {
            this.houseBuilder = new HouseBuilder_js_1.default();
        }
        ;
        createDefaultHouse() {
            let defaultHouse = this.houseBuilder.build();
            return defaultHouse;
        }
        createBigHouse() {
            let superHouse = this.houseBuilder
                .setRoofType("░")
                .setFoundationType("▒")
                .setFloors(5)
                .setEntrances(5)
                .setWindows(new HouseComplexPart_js_2.default(HouseComplexTypes_js_2.default.WINDOW, 65))
                .setDoors(new HouseComplexPart_js_2.default(HouseComplexTypes_js_2.default.DOOR, 10))
                .build();
            return superHouse;
        }
        createSampleHouse() {
            let superHouse = this.houseBuilder
                .setRoofType("░")
                .setFoundationType("▒")
                .setFloors(2)
                .setEntrances(1)
                .setWindows(new HouseComplexPart_js_2.default(HouseComplexTypes_js_2.default.WINDOW, 3))
                .setDoors(new HouseComplexPart_js_2.default(HouseComplexTypes_js_2.default.DOOR, 1))
                .build();
            return superHouse;
        }
        createMiddleHouse() {
            let superHouse = this.houseBuilder
                .setRoofType("░")
                .setFoundationType("▒")
                .setFloors(4)
                .setEntrances(4)
                .setWindows(new HouseComplexPart_js_2.default(HouseComplexTypes_js_2.default.WINDOW, 44))
                .setDoors(new HouseComplexPart_js_2.default(HouseComplexTypes_js_2.default.DOOR, 4))
                .build();
            return superHouse;
        }
        createInvalidHouse() {
            console.log("Try to creat house with -10 floors, NaN doors and null wallTypes...");
            console.log("Create house with default floors...");
            let invalidHouse;
            invalidHouse = this.houseBuilder
                .setFloors(-10)
                .setFloors(NaN)
                .setDoors(new HouseComplexPart_js_2.default(HouseComplexTypes_js_2.default.DOOR, NaN))
                .setDoors(new HouseComplexPart_js_2.default(HouseComplexTypes_js_2.default.DOOR, 2))
                .setWindows(null)
                .setWallType(null)
                .build();
            return invalidHouse;
        }
    }
    exports.default = HouseDirector;
});
define("main", ["require", "exports", "src/classes/HouseDirector"], function (require, exports, HouseDirector_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let houseDirector = new HouseDirector_js_1.default();
    console.log("%cDefault House: ", "color: green");
    console.log(houseDirector.createDefaultHouse());
    console.log("%cSample House: ", "color: green");
    console.log(houseDirector.createSampleHouse());
    console.log("%cBig House: ", "color: green");
    console.log(houseDirector.createBigHouse());
    console.log("%cMiddle House: ", "color: green");
    console.log(houseDirector.createMiddleHouse());
    console.log("%cInvalid House: ", "color: green");
    console.log(houseDirector.createInvalidHouse());
});
