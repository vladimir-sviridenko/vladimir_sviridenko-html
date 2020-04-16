import House from "../House.js";
import ValidationError from "../errors/ValidationError.js";

import IValidator from "../../interfaces/IValidator.js";

class HouseValidator implements IValidator {
  validate(house: House) {
    const entrances = house.getEntrances();
    const doors = house.getDoors().getQuantity();
    if(entrances > doors) {
      house.setEntrances(doors);
    }
    return house; 
  }
}

export default HouseValidator;