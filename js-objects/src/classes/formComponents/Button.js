import FormComponent from "../formComponents/FormComponent.js";

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
Button.prototype.constructor = Button;

export default Button;