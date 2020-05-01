import AuthenticationForm from "classes/forms/AuthenticationForm";

const form = new AuthenticationForm();
const formElement = form.domWorker.create();
const formContainer = document.querySelector(".app-form");
formContainer.append(formElement);