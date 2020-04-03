import AuthenticationForm from "./forms/AuthenticationForm.js";
import Input from "./formComponents/Input.js";
import Checkbox from "./formComponents/Checkbox.js";
import Button from "./formComponents/Button.js";

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
    this._appendFormComponents();

    return this._formElement;
  }

  update() {
    this._formElement.innerHTML = "";
    this._appendFormComponents();
  }

  _appendFormComponents() {
    const titleElement = document.createElement("label");
    titleElement.classList.add("form__label");
    titleElement.classList.add("form__label_title");
    titleElement.innerHTML = this._form.title;
    this._formElement.append(titleElement);

    this._form.shownComponents.forEach((component) => {

      if (component instanceof Input) {
        const inputElement = document.createElement("input");
        inputElement.name = component.name;
        inputElement.placeholder = component.name;
        inputElement.classList.add("form__input");
        switch (component.name) {
          case "password":
            inputElement.type = "password";
            break;
          case "password-verification":
            inputElement.type = "password";
            break;
          case "email":
            inputElement.type = "email";
            break;
          default:
            inputElement.type = "text";
            break;
        }
        this._formElement.append(inputElement);
      }

      if (component instanceof Checkbox) {
        const checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.name = component.name;
        checkboxElement.checked = component.checked;
        checkboxElement.classList.add("form__checkbox");
        checkboxElement.onclick = function () {
          component.check();
        };
        const label = document.createElement("label");
        label.innerHTML = component.description;
        label.classList.add("form__label");
        label.prepend(checkboxElement);
        this._formElement.append(label);
      }

      if (component instanceof Button) {
        const buttonElement = document.createElement("button");
        buttonElement.type = "submit";
        buttonElement.innerHTML = component.value;
        buttonElement.classList.add("form__button");
        this._formElement.append(buttonElement);
      }
    });
  }
}

export default AuthenticationFormDomWorker;