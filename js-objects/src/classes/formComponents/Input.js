import FormComponent from "../formComponents/FormComponent.js";
import ComponentType from "../../enums/ComponentType.js";

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

Input.prototype.createElement = function () {
  const inputElement = document.createElement("input");
  inputElement.name = this.name;
  inputElement.placeholder = this.name;
  inputElement.classList.add("form__input");
  switch (this.name) {
    case "password":
      inputElement.type = ComponentType.PASSWORD;
      break;
    case "password-verification":
      inputElement.type = ComponentType.PASSWORD;
      break;
    case "email":
      inputElement.type = ComponentType.EMAIL;
      break;
    default:
      inputElement.type = ComponentType.TEXT;
      break;
  }
  return inputElement;
}

Input.prototype.constructor = Input;

export default Input;