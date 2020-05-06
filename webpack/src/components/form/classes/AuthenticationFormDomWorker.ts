import AuthenticationForm from "./forms/AuthenticationForm";

class AuthenticationFormDomWorker {
  private _form: AuthenticationForm;
  private _formElement: HTMLFormElement;

  constructor(form: AuthenticationForm) {
    this._form = form;
  }

  public create(): HTMLFormElement {
    this._formElement = document.createElement("form");
    this._formElement.method = "POST";
    this._formElement.action = "https://www.w3schools.com/action_page.php";
    this._formElement.classList.add("form");
    this.appendFormComponents();

    return this._formElement;
  }

  public update(): void {
    this._formElement.innerHTML = "";
    this.appendFormComponents();
  }

  private appendFormComponents(): void {
    const titleElement = document.createElement("label");
    titleElement.classList.add("form__label");
    titleElement.classList.add("form__label_title");
    titleElement.innerHTML = this._form.title;
    this._formElement.append(titleElement);

    this._form.shownComponents.forEach((component) => {
      this._formElement.append(component.createElement());
    });
  }
}

export default AuthenticationFormDomWorker;