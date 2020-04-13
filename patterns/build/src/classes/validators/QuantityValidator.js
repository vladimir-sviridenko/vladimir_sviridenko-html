import ValidationError from "../errors/ValidationError.js";
class QuantityValidator {
    validate(quantity) {
        if (quantity > 0 && this.isInteger(quantity)) {
            return quantity;
        }
        else {
            throw new ValidationError("quantity should be integer and more than 1");
        }
    }
    isInteger(number) {
        return (number ^ 0) === number;
    }
    ;
}
export default QuantityValidator;
