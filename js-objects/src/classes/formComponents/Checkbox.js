import FormComponent from "../formComponents/FormComponent.js";

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
    this.form.notify(this, "check");
    this._checked = !this._checked;
  } else {
    throw new Error("be sure that component have form to interact");
  }
}

Checkbox.prototype.constructor = Checkbox;

export default Checkbox;