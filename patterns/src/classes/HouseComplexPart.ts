import QuantityValidator from "./validators/QuantityValidator.js";

class HouseComplexPart {
  private width: number;
  private height: number;
  private model: string[];
  private quantity: number;

  constructor(model: string[], quantity: number) {
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