import "./index.html";
import "./scss/main.scss";
import logoUrl from "assets/images/webpack-logo.gif";
import { loadForm } from "./components/form";

const formContainer = document.querySelector(".app-form");

const text = document.createElement("span");
text.innerHTML = "Click image to load AuthenticationForm module";
text.classList.add("app-form__text");

const formImage = document.createElement("img");
formImage.classList.add("app-form__image");
formImage.width = 220;
formImage.src = logoUrl;
formImage.onclick = () => {
  loadForm().then(formElement => {
    text.replaceWith(formElement);
    formImage.onclick = null;
  });
}
formContainer.append(formImage);
formContainer.append(text);

