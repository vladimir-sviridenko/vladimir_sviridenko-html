import Form from "../forms/Form.js";

function FormComponent(form) {
  if (this.constructor === FormComponent) {
    throw new Error("Cannot create an instance of abstract class");
  }
  if (form instanceof Form) {
    this._form = form;
  } else {
    throw new TypeError("FormComponent must be part of Form");
  }
  this._hidden = false;

  Object.defineProperty(this, "form", {
    get: function () {
      return this._form;
    }
  });

  Object.defineProperty(this, "hidden", {
    get: function () {
      return this._hidden;
    },
    set: function (hidden) {
      if (typeof hidden === "boolean") {
        this._hidden = hidden;
      } else {
        throw new TypeError("checked must be boolean");
      }
    }
  });
};

FormComponent.prototype.click = function () {
  if (this.form) {
    this.form.notify(this, "click");
  } else {
    throw new Error("be sure that component have form to interact");
  }
}

FormComponent.prototype.createElement = function () {
  throw new Error("createElement is not implemented");
}

export default FormComponent;