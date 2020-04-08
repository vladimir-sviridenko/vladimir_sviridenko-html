import AuthenticationForm from "./forms/AuthenticationForm.js";

class AuthenticationFormDomWorker {
  constructor(form) {
    if (form instanceof AuthenticationForm) {
      this._form = form;
    } else {
      throw new TypeError("the dom worker only for AuthenticationForm");
    }
  }

  create() {
    this._formElement = document.createElement("form");
    this._formElement.method = "POST";
    this._formElement.action = "https://www.w3schools.com/action_page.php";
    this._formElement.classList.add("form");
    this.appendFormComponents();

    return this._formElement;
  }

  update() {
    this._formElement.innerHTML = "";
    this.appendFormComponents();
  }

  appendFormComponents() {
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