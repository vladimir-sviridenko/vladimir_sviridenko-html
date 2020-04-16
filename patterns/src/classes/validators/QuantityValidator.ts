import ValidationError from "../errors/ValidationError.js";

import IValidator from "../../interfaces/IValidator.js";

class QuantityValidator implements IValidator {
  validate(quantity: number) {
    if(quantity > 0 && this.isInteger(quantity) && quantity != NaN) {
      return quantity;
    } else {
      return null;
    }
  }
  isInteger(number: number) {
    return (number ^ 0) === number;
  };
}

export default QuantityValidator;