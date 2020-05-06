import "./index.html";
import "./styles/main.scss";
import logoUrl from "images/webpack-logo.gif";
import AuthenticationForm from "classes/forms/AuthenticationForm";

const form = new AuthenticationForm();
const formElement = form.domWorker.create();
const formContainer = document.querySelector(".app-form");
formContainer.append(formElement);

const formImage = document.createElement("img");
formImage.classList.add("app-form__image");
formImage.width = 220;
formImage.src = logoUrl;
formContainer.prepend(formImage);