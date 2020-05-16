import FormComponent from "../formComponents/FormComponent";

abstract class Form {
  protected _title: string;

  constructor(title: string) {
    this._title = title;
  }

  get title(): string {
    return this._title;
  }

  abstract notify(sender: FormComponent, event: string): void
}

export default Form;