var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("decorators/Confirmable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Confirmable(message) {
        return (target, propertyName, descriptor) => {
            const originalMethod = descriptor.value;
            descriptor.value = function (...args) {
                return confirm(message) ? originalMethod.apply(this, args) : null;
            };
            return descriptor;
        };
    }
    exports.default = Confirmable;
});
define("classes/formComponents/FormComponent", ["require", "exports", "decorators/Confirmable"], function (require, exports, Confirmable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FormComponent {
        constructor(form) {
            this._form = null;
            this.hidden = false;
            this._form = form;
        }
        get form() {
            return this._form;
        }
        click() {
            if (this.form) {
                this.form.notify(this, "click");
                return true;
            }
            else {
                throw new Error("be sure that component have form to interact");
            }
        }
    }
    __decorate([
        Confirmable_1.default("Are you sure to do the action?")
    ], FormComponent.prototype, "click", null);
    exports.default = FormComponent;
});
define("classes/forms/Form", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Form {
        constructor(title) {
            this._title = title;
        }
        get title() {
            return this._title;
        }
    }
    exports.default = Form;
});
define("enums/ComponentType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentType;
    (function (ComponentType) {
        ComponentType["TEXT"] = "text";
        ComponentType["EMAIL"] = "email";
        ComponentType["PASSWORD"] = "password";
        ComponentType["CHECKBOX"] = "checkbox";
        ComponentType["SUBMIT"] = "submit";
    })(ComponentType || (ComponentType = {}));
    ;
    exports.default = ComponentType;
});
define("classes/formComponents/Input", ["require", "exports", "classes/formComponents/FormComponent", "enums/ComponentType"], function (require, exports, FormComponent_1, ComponentType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Input extends FormComponent_1.default {
        constructor(form, name) {
            super(form);
            this._name = name;
        }
        get name() {
            return this._name;
        }
        change() {
            if (this.form) {
                this.form.notify(this, "change");
            }
            else {
                throw new Error("be sure that component have form to interact");
            }
        }
        createElement() {
            const inputElement = document.createElement("input");
            inputElement.name = this.name;
            inputElement.placeholder = this.name;
            inputElement.classList.add("form__input");
            switch (this.name) {
                case "password":
                    inputElement.type = ComponentType_1.default.PASSWORD;
                    break;
                case "password-verification":
                    inputElement.type = ComponentType_1.default.PASSWORD;
                    break;
                case "email":
                    inputElement.type = ComponentType_1.default.EMAIL;
                    break;
                default:
                    inputElement.type = ComponentType_1.default.TEXT;
                    break;
            }
            return inputElement;
        }
    }
    exports.default = Input;
});
define("classes/formComponents/Button", ["require", "exports", "classes/formComponents/FormComponent", "enums/ComponentType"], function (require, exports, FormComponent_2, ComponentType_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Button extends FormComponent_2.default {
        constructor(form, value) {
            super(form);
            this._value = value;
        }
        get value() {
            return this._value;
        }
        createElement() {
            const buttonElement = document.createElement("button");
            buttonElement.type = ComponentType_2.default.SUBMIT;
            buttonElement.innerHTML = this.value;
            buttonElement.classList.add("form__button");
            buttonElement.onclick = (event) => {
                const clicked = this.click();
                if (!clicked) {
                    event.preventDefault();
                }
            };
            return buttonElement;
        }
    }
    exports.default = Button;
});
define("classes/formComponents/Checkbox", ["require", "exports", "classes/formComponents/FormComponent", "enums/ComponentType"], function (require, exports, FormComponent_3, ComponentType_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Checkbox extends FormComponent_3.default {
        constructor(form, name, checked = false, description = "") {
            super(form);
            this._name = name;
            this.checked = checked;
            this._description = description;
        }
        get name() {
            return this._name;
        }
        get description() {
            return this._description;
        }
        check() {
            if (this.form) {
                this.checked = !this.checked;
                this.form.notify(this, "check");
                return true;
            }
            else {
                throw new Error("be sure that component have form to interact");
            }
        }
        createElement() {
            const checkboxElement = document.createElement("input");
            checkboxElement.type = ComponentType_3.default.CHECKBOX;
            checkboxElement.name = this.name;
            checkboxElement.checked = this.checked;
            checkboxElement.classList.add("form__checkbox");
            checkboxElement.onclick = () => {
                const checked = this.check();
                if (!checked) {
                    event.preventDefault();
                }
            };
            const checkboxWrapper = document.createElement("label");
            checkboxWrapper.innerHTML = this.description;
            checkboxWrapper.classList.add("form__label");
            checkboxWrapper.prepend(checkboxElement);
            return checkboxWrapper;
        }
    }
    exports.default = Checkbox;
});
define("classes/AuthenticationFormDomWorker", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AuthenticationFormDomWorker {
        constructor(form) {
            this._form = form;
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
    exports.default = AuthenticationFormDomWorker;
});
define("interfaces/IAuthenticationForm", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("classes/forms/AuthenticationForm", ["require", "exports", "classes/forms/Form", "classes/formComponents/Input", "classes/formComponents/Button", "classes/formComponents/Checkbox", "classes/AuthenticationFormDomWorker"], function (require, exports, Form_1, Input_1, Button_1, Checkbox_1, AuthenticationFormDomWorker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AuthenticationForm extends Form_1.default {
        constructor() {
            super("Authentication");
            this._domWorker = new AuthenticationFormDomWorker_1.default(this);
            this._haveAccountCheckbox = new Checkbox_1.default(this, "haveAccount", true, "I already have an account");
            this._loginField = new Input_1.default(this, "login");
            this._emailField = new Input_1.default(this, "email");
            this._passwordField = new Input_1.default(this, "password");
            this._passwordVerify = new Input_1.default(this, "password-verification");
            this._subscribeNewsCheckbox = new Checkbox_1.default(this, "subscribeNews", true, "Subscribe interesting news");
            this._signInButton = new Button_1.default(this, "Sign In");
            this._signUpButton = new Button_1.default(this, "Sign Up");
            this.showSignInForm();
        }
        notify(sender, event) {
            if (sender === this._haveAccountCheckbox && event === "check") {
                if (this._haveAccountCheckbox.checked) {
                    this.showSignInForm();
                }
                else {
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
            const components = [
                this._haveAccountCheckbox,
                this._loginField,
                this._emailField,
                this._passwordField,
                this._passwordVerify,
                this._subscribeNewsCheckbox,
                this._signUpButton,
                this._signInButton
            ];
            return components.filter(component => !component.hidden);
        }
    }
    exports.default = AuthenticationForm;
});
define("main", ["require", "exports", "classes/forms/AuthenticationForm"], function (require, exports, AuthenticationForm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const form = new AuthenticationForm_1.default();
    const formElement = form.domWorker.create();
    const formContainer = document.querySelector(".app-form");
    formContainer.append(formElement);
});
