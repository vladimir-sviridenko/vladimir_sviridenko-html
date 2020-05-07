import Form from "classes/forms/Form";
import Input from "classes/formComponents/Input";
import Button from "classes/formComponents/Button";
import Checkbox from "classes/formComponents/Checkbox";
import FormComponent from "classes/formComponents/FormComponent";
import AuthenticationFormDomWorker from "classes/AuthenticationFormDomWorker";
import IAuthenticationForm from "interfaces/IAuthenticationForm";

class AuthenticationForm extends Form implements IAuthenticationForm {

  public readonly _haveAccountCheckbox: Checkbox;
  public readonly _domWorker: AuthenticationFormDomWorker;
  public readonly _loginField: Input;
  public readonly _emailField: Input;
  public readonly _passwordField: Input;
  public readonly _passwordVerify: Input;
  public readonly _subscribeNewsCheckbox: Checkbox;
  public readonly _signInButton: Button;
  public readonly _signUpButton: Button;

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

  public notify(sender: FormComponent, event: string) {
    if (sender === this._haveAccountCheckbox && event === "check") {
      if (this._haveAccountCheckbox.checked) {
        this.showSignInForm();
      } else {
        this.showSignUpForm();
      }

      this._domWorker.update();
    }
  }

  public showSignInForm(): void {
    this._loginField.hidden = false;
    this._passwordField.hidden = false;
    this._signInButton.hidden = false;

    this._emailField.hidden = true;
    this._passwordVerify.hidden = true;
    this._subscribeNewsCheckbox.hidden = true;
    this._signUpButton.hidden = true;

    this._title = "Sign In";
  }

  public showSignUpForm(): void {
    this._loginField.hidden = false;
    this._emailField.hidden = false;
    this._passwordField.hidden = false;
    this._passwordVerify.hidden = false;
    this._subscribeNewsCheckbox.hidden = false;
    this._signUpButton.hidden = false;

    this._signInButton.hidden = true;

    this._title = "Sign Up";
  }

  get domWorker(): AuthenticationFormDomWorker {
    return this._domWorker;
  }

  get shownComponents(): FormComponent[] {
    const components: FormComponent[] = [
      this._haveAccountCheckbox,
      this._loginField,
      this._emailField,
      this._passwordField,
      this._passwordVerify,
      this._subscribeNewsCheckbox,
      this._signUpButton,
      this._signInButton
    ];

    return components.filter(component => !component.hidden)
  }
}

export default AuthenticationForm;