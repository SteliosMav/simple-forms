/* eslint no-underscore-dangle: "off" */

import FormInput from "./input";

type FormValue = { [key: string]: any };

type Inputs<V> = {
  [key in keyof V]: FormInput<V[key]>;
};

export default class Form<V extends FormValue> extends FormInput<any> {
  constructor(public inputs: Inputs<V>) {
    super(getFormValue<V>(inputs));
    for (const entries of Object.entries(inputs)) {
      const [key, input] = entries as [keyof V, FormInput<V[keyof V]>];
      input.onChange((value) => (this.value = { ...this.value, [key]: value }));
      input.onDirt(() => (this.dirty = true));
      input.onTouch(() => (this.touched = true));
      input.onFocus(() => (this.focused = true));
      input.onBlur(() => (this.blurred = true));
    }
    delete (this as Partial<FormValue>).validators;
    this._protected.checkValidity = () => {
      for (let input of Object.values(this.inputs)) {
        if (!input.valid) {
          this._protected.valid = false;
          this._protected.message = input.message;
          break;
        }
      }
    };
    this._protected.checkValidity();
  }
}

function getFormValue<V>(inputs: Inputs<V>): V {
  const formValue: V = {} as V;
  for (const entries of Object.entries(inputs)) {
    const [key, input] = entries as [keyof V, FormInput<V[keyof V]>];
    formValue[key] = input.value;
  }
  return formValue;
}
