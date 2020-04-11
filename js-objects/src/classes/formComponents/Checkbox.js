import FormComponent from "../formComponents/FormComponent.js";
import ComponentType from "../../enums/ComponentType.js";

function Checkbox(form, name, checked = false, description = "") {
  FormComponent.call(this, form);

  if (typeof name === "string") {
    this._name = name;
  } else {
    throw new TypeError("name must be string");
  }

  if (typeof checked === "boolean") {
    this._checked = checked;
  } else {
    throw new TypeError("checked must be boolean");
  }

  if (typeof description === "string") {
    this._description = description;
  } else {
    throw new TypeError("description must be string");
  }

  Object.defineProperty(this, "name", {
    get: function () {
      return this._name;
    }
  });

  Object.defineProperty(this, "checked", {
    get: function () {
      return this._checked;
    }
  });

  Object.defineProperty(this, "description", {
    get: function () {
      return this._description;
    }
  });
}

Checkbox.prototype = Object.create(FormComponent.prototype);

Checkbox.prototype.check = function () {
  if (this.form) {
    this._checked = !this._checked;
    this.form.notify(this, "check");
  } else {
    throw new Error("be sure that component have form to interact");
  }
}

Checkbox.prototype.createElement = function () {
  const checkboxElement = document.createElement("input");
  checkboxElement.type = ComponentType.CHECKBOX;
  checkboxElement.name = this.name;
  checkboxElement.checked = this.checked;
  checkboxElement.classList.add("form__checkbox");
  checkboxElement.onclick = () => this.check();
  const checkboxWrapper = document.createElement("label");
  checkboxWrapper.innerHTML = this.description;
  checkboxWrapper.classList.add("form__label");
  checkboxWrapper.prepend(checkboxElement);
  return checkboxWrapper;
}

Checkbox.prototype.constructor = Checkbox;

export default Checkbox;