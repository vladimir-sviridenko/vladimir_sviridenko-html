import Form from "./Form.js";
import Input from "../formComponents/Input.js";
import Button from "../formComponents/Button.js";
import Checkbox from "../formComponents/Checkbox.js";
import FormComponent from "../formComponents/FormComponent.js";
import AuthenticationFormDomWorker from "../AuthenticationFormDomWorker.js";

class AuthenticationForm extends Form {
  constructor() {
    super("Authentication");
    this._domWorker = new AuthenticationFormDomWorker(this);

    this._haveAccountCheckbox = new Checkbox(this, "haveAccount", true, "I already have an account");
    this._loginField = new Input(this, "login");
    this._emailField = new Input(this, "email");
    this._passwordField = new Input(this, "password");
    this._passwordVerify = new Input(this, "password-verification");
    this._subscribeNewsCheckbox = new Checkbox(this, "subscribeNews", true, "Subscribe interesting news");
    this._signInButton = new Button(this, "Sign In");
    this._signUpButton = new Button(this, "Sign Up");

    this.showSignInForm();
  }

  notify(sender, event) {
    if (sender === this._haveAccountCheckbox && event === "check") {
      if (this._haveAccountCheckbox.checked) {
        this.showSignInForm();
      } else {
        this.showSignUpForm();
      }
      this._domWorker.update();
    }
  }

  showSignInForm() {
    this._loginField.hidden = false;
    this._passwordField.hidden = false;
    this._signInButton.hidden = false;

    this._emailField.hidden = true;
    this._passwordVerify.hidden = true;
    this._subscribeNewsCheckbox.hidden = true;
    this._signUpButton.hidden = true;

    this._title = "Sign In";
  }

  showSignUpForm() {
    this._loginField.hidden = false;
    this._emailField.hidden = false;
    this._passwordField.hidden = false;
    this._passwordVerify.hidden = false;
    this._subscribeNewsCheckbox.hidden = false;
    this._signUpButton.hidden = false;

    this._signInButton.hidden = true;

    this._title = "Sign Up";
  }

  get domWorker() {
    return this._domWorker;
  }

  get shownComponents() {
    const shownComponents = [];
    Object.getOwnPropertyNames(this).forEach((prop) => {
      if (this[prop] instanceof FormComponent && this[prop].hidden === false) {
        shownComponents.push(this[prop]);
      }
    });
    return shownComponents;
  }
}

export default AuthenticationForm;