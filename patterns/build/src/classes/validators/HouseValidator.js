import ValidationError from "../errors/ValidationError.js";
class HouseValidator {
    validate(house) {
        if (house.getFloors() > house.getWindows().quantity) {
            throw new ValidationError("House should have at least 1 window on each floor");
        }
        else {
            return house;
        }
    }
}
export default HouseValidator;
