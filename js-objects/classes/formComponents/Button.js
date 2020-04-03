import FormComponent from "./FormComponent.js";

class Button extends FormComponent {
  constructor(form, value) {
    super(form);
    
    if(typeof value === "string") {
      this._value = value;
    } else {
      throw new TypeError("value must be string");
    }
  }

  get value() {
    return this._value;
  }
}

export default Button;