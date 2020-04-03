import FormComponent from "../formComponents/FormComponent.js";

function Input(form, name) {
  FormComponent.call(this, form);

  if (typeof name === "string") {
    this._name = name;
  } else {
    throw new TypeError("name must be string");
  }

  Object.defineProperty(this, "name", {
    get: function () {
      return this._name;
    }
  });
}

Input.prototype = Object.create(FormComponent.prototype);

Input.prototype.change = function () {
  if (this.form) {
    this.form.notify(this, "change");
  } else {
    throw new Error("be sure that component have form to interact");
  }
}

Input.prototype.constructor = Input;

export default Input;