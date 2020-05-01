import FormComponent from "classes/formComponents/FormComponent";
import ComponentType from "enums/ComponentType";
import Form from "classes/forms/Form";

class Checkbox extends FormComponent {
  public checked: boolean;
  private _name: string;
  private _description: string;

  constructor(form: Form, name: string, checked: boolean = false, description: string = "") {
    super(form);
    this._name = name;
    this.checked = checked;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  check(): boolean | never {
    if (this.form) {
      this.checked = !this.checked;
      this.form.notify(this, "check");
      return true;
    } else {
      throw new Error("be sure that component have form to interact");
    }
  }

  public createElement(): HTMLLabelElement {
    const checkboxElement = document.createElement("input");
    checkboxElement.type = ComponentType.CHECKBOX;
    checkboxElement.name = this.name;
    checkboxElement.checked = this.checked;
    checkboxElement.classList.add("form__checkbox");
    checkboxElement.onclick = () => {
      const checked = this.check();
      if (!checked) {
        event.preventDefault();
      }
    }
    const checkboxWrapper = document.createElement("label");
    checkboxWrapper.innerHTML = this.description;
    checkboxWrapper.classList.add("form__label");
    checkboxWrapper.prepend(checkboxElement);
    return checkboxWrapper;
  }
}

export default Checkbox;