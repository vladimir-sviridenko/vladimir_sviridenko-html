import FormComponent from "./FormComponent.js";

class Checkbox extends FormComponent {
  constructor(form, name, checked = false, description = "") {
    super(form);
    
    if(typeof name === "string") {
      this._name = name;
    } else {
      throw new TypeError("name must be string");
    }

    if(typeof checked === "boolean") {
      this._checked = checked;
    } else {
      throw new TypeError("checked must be boolean");
    }

    if(typeof description === "string") {
      this._description = description;
    } else {
      throw new TypeError("description must be string");
    }
  }

  check() {
    if(this.form) {
      this.form.notify(this, "check");
      this._checked = !this._checked;
    } else {
      throw new Error("be sure that component have form to interact");
    }
  }
  
  get name() {
    return this._name;
  }

  get checked() {
    return this._checked;
  }

  get description() {
    return this._description;
  }
}

export default Checkbox;