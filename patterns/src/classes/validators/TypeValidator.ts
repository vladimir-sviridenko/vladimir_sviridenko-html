import ValidationError from "../errors/ValidationError.js";

import IValidator from "../../interfaces/IValidator.js";

class TypeValidator implements IValidator{
  validate(string: string) {
    let trimed = string ? string.trim() : null;
    if(trimed !== null && trimed !== "" && trimed.length === 1) {
      return trimed;
    } else {
      return null;
    }
  }
}

export default TypeValidator;