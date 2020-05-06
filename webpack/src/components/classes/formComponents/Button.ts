import FormComponent from "classes/formComponents/FormComponent";
import ComponentType from "enums/ComponentType";
import Form from "classes/forms/Form";

class Button extends FormComponent {
  private _value: string;

  constructor(form: Form, value: string) {
    super(form);
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  public createElement(): HTMLButtonElement {
    const buttonElement = document.createElement("button");
    buttonElement.type = ComponentType.SUBMIT;
    buttonElement.innerHTML = this.value;
    buttonElement.classList.add("form__button");
    buttonElement.onclick = (event) => {
      const clicked: boolean = this.click();
      if (!clicked) {
        event.preventDefault();
      }
    }
    return buttonElement;
  }
}

export default Button;