import IValidator from "../../interfaces/IValidator";
import HouseComplexPart from "../HouseComplexPart";

class ComplexPartValidator implements IValidator {
  validate(complexPart: HouseComplexPart) {
    if (complexPart !== null) {
      return complexPart;
    } else {
      return null;
    }
  }
}

export default ComplexPartValidator;