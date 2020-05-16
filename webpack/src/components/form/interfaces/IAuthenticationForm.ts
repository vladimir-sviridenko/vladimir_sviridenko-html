import Checkbox from "../classes/formComponents/Checkbox";
import AuthenticationFormDomWorker from "../classes/AuthenticationFormDomWorker";
import Input from "../classes/formComponents/Input";
import Button from "../classes/formComponents/Button";
import FormComponent from "../classes/formComponents/FormComponent";

interface IAuthenticationForm {

  readonly _haveAccountCheckbox: Checkbox;
  readonly _domWorker: AuthenticationFormDomWorker;
  readonly _loginField: Input;
  readonly _emailField: Input;
  readonly _passwordField: Input;
  readonly _passwordVerify: Input;
  readonly _subscribeNewsCheckbox: Checkbox;
  readonly _signInButton: Button;
  readonly _signUpButton: Button;

  notify(sender: FormComponent, event: string): void;
  showSignInForm(): void;
  showSignUpForm(): void;
}

export default IAuthenticationForm;