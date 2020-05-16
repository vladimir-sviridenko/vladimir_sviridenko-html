function loadForm() {
  return import(/* webpackChunkName: "AuthenticationForm" */ './classes/forms/AuthenticationForm')
    .then(({ default: AuthenticationForm }) => {
      const form = new AuthenticationForm();
      const formElement = form.domWorker.create();

      return formElement;
    })
    .catch(error => 'An error occurred while loading the component, reload page');
}

export { loadForm };