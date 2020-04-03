import Form from "../forms/Form.js";

class FormComponent {
  constructor(form) {
    if(this.constructor == FormComponent) {
      throw new Error("Cannot create an instance of abstract class");
    }
    if(form instanceof Form) {
      this._form = form;
    } else {
      throw new TypeError("FormComponent must be part of Form");
    }
    this._hidden = false;
  }

  get form() {
    return this._form;
  }

  set hidden(hidden) {
    if(typeof hidden === "boolean") {
      this._hidden = hidden;
    } else {
      throw new TypeError("checked must be boolean");
    }
  }

  get hidden() {
    return this._hidden;
  }

  click() {
    if(this.form) {
      this.form.notify(this, "click");
    } else {
      throw new Error("be sure that component have form to interact");
    }
  }
}

export default FormComponent;