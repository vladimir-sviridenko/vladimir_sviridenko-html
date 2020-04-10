import ValidationError from "../errors/ValidationError.js";
class NumberValidator {
    validate(value) {
        if (value > 0 && this.isInteger(value)) {
            return value;
        }
        else {
            throw new ValidationError("number should be integer and more than 1");
        }
    }
    isInteger(number) {
        return (number ^ 0) === number;
    }
    ;
}
export default NumberValidator;
