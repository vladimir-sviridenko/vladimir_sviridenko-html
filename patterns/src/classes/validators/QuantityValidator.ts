import ValidationError from "../errors/ValidationError.js";

import IValidator from "../../interfaces/IValidator.js";

class QuantityValidator implements IValidator {
  validate(quantity: number) {
    if(quantity > 0 && this.isInteger(quantity)) {
      return quantity;
    } else {
      throw new ValidationError("quantity should be integer and more than 1");
    }
  }
  isInteger(number: number) {
    return (number ^ 0) === number;
  };
}

export default QuantityValidator;