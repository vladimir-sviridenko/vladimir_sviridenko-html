import House from "../House.js";
import ValidationError from "../errors/ValidationError.js";

import IValidator from "../../interfaces/IValidator.js";

class HouseValidator implements IValidator {
  validate(house: House) {
    if(house.getFloors() > house.getWindows().quantity) {
      throw new ValidationError("House should have at least 1 window on each floor");
    } else {
      return house;
    }
  }
}

export default HouseValidator;