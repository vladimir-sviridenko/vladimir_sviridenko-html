import QuantityValidator from "./validators/QuantityValidator.js";
class HouseComplexPart {
    constructor(model, quantity) {
        this.model = model;
        this.width = this.model[0].length;
        this.height = this.model.length;
        this.quantity = new QuantityValidator().validate(quantity);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getModel() {
        return this.model;
    }
    getQuantity() {
        return this.quantity;
    }
}
export default HouseComplexPart;
