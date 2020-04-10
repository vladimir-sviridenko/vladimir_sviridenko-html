import ValidationError from "../errors/ValidationError.js";

import IValidator from "../../interfaces/IValidator.js";

class NumberValidator implements IValidator {
  validate(value: number) {
    if(value > 0 && this.isInteger(value)) {
      return value;
    } else {
      throw new ValidationError("number should be integer and more than 1");
    }
  }
  isInteger(number: number) {
    return (number ^ 0) === number;
  };
}

export default NumberValidator;