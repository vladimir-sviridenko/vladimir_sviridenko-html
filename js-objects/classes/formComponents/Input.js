import FormComponent from "./FormComponent.js";

class Input extends FormComponent {
  constructor(form, name) {
    super(form);

    if(typeof name === "string") {
      this._name = name;
    } else {
      throw new TypeError("name must be string");
    }
  }

  get name() {
    return this._name;
  }

  change() {
    if(this.form) {
      this.form.notify(this, "change");
    } else {
      throw new Error("be sure that component have form to interact");
    }
  }
}

export default Input;