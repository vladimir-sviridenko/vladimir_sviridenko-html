import FormComponent from "../formComponents/FormComponent.js";
import ComponentType from "../../enums/ComponentType.js";

function Button(form, value) {
  FormComponent.call(this, form);

  if (typeof value === "string") {
    this._value = value;
  } else {
    throw new TypeError("value must be string");
  }

  Object.defineProperty(this, "value", {
    get: function () {
      return this._value;
    }
  });
}

Button.prototype = Object.create(FormComponent.prototype);

Button.prototype.createElement = function () {
  const buttonElement = document.createElement("button");
  buttonElement.type = ComponentType.SUBMIT;
  buttonElement.innerHTML = this.value;
  buttonElement.classList.add("form__button");
  return buttonElement;
}

Button.prototype.constructor = Button;

export default Button;