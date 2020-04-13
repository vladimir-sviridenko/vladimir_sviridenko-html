import ValidationError from "../errors/ValidationError.js";

import IValidator from "../../interfaces/IValidator.js";

class TypeValidator implements IValidator{
  validate(string: string) {
    let trimed = string.trim();
    if(trimed !== "" && trimed.length === 1) {
      return trimed;
    } else {
      throw new ValidationError("type should be one char");
    }
  }
}

export default TypeValidator;