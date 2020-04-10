import ValidationError from "../errors/ValidationError.js";

import IValidator from "../../interfaces/IValidator.js";

class StringValidator implements IValidator{
  validate(value: string) {
    if(value.trim() !== "") {
      return value;
    } else {
      throw new ValidationError("string variable can't be empty");
    }
  }
}

export default StringValidator;