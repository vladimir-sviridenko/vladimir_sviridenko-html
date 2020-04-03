import FormComponent from "../formComponents/FormComponent.js";

class Form {
  constructor(title) {
    if(this.constructor === Form) {
      throw new Error("Cannot create an instance of abstract class");
    }

    if(typeof title === "string") {
      this._title = title;
    } else {
      throw new TypeError("title must be string");
    }
  }

  get title() {
    return this._title;
  }

  notify(sender, event) {
    throw new Error("notify is not implemented");
  }
}

export default Form;