import ValidationError from "../errors/ValidationError.js";
class StringValidator {
    validate(value) {
        if (value.trim() !== "") {
            return value;
        }
        else {
            throw new ValidationError("string variable can't be empty");
        }
    }
}
export default StringValidator;
