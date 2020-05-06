import Form from "../forms/Form";
import FormComponent from "./FormComponent";
import ComponentType from "../../enums/ComponentType";

class Input extends FormComponent {
  private _name: string;

  constructor(form: Form, name: string) {
    super(form);
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  public change(): void | never {
    if (this.form) {
      this.form.notify(this, "change");
    } else {
      throw new Error("be sure that component have form to interact");
    }
  }

  public createElement(): HTMLElement {
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
}

export default Input;