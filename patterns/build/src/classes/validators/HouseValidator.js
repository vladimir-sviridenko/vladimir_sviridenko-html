import ValidationError from "../errors/ValidationError.js";
class HouseValidator {
    validate(house) {
        const entrances = house.getEntrances();
        const doors = house.getDoors().getQuantity();
        if (entrances > doors) {
            throw new ValidationError("House should have at least one door on each entrance");
        }
        else if (entrances > 1 && doors / entrances > 2) {
            throw new ValidationError("house with entrances more than 1 can't have more then entrance * 2 doors");
        }
        else {
            return house;
        }
    }
}
export default HouseValidator;
