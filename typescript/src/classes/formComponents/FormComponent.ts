import Form from "classes/forms/Form";
import Confirmable from "decorators/Confirmable";

abstract class FormComponent {
  private _form: Form = null;
  public hidden: boolean = false;

  constructor(form: Form) {
    this._form = form;
  }

  get form(): Form {
    return this._form;
  }

  @Confirmable("Are you sure to do the action?")
  public click(): boolean | never {
    if (this.form) {
      this.form.notify(this, "click");
      return true;
    } else {
      throw new Error("be sure that component have form to interact");
    }
  }

  public abstract createElement(): HTMLElement;
}

export default FormComponent;