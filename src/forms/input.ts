/* eslint no-underscore-dangle: "off" */
/* eslint no-unused-vars: "off" */
/* eslint default-case: "off" */
/* eslint class-methods-use-this: "off" */
/* eslint no-plusplus: "off" */
/* eslint @typescript-eslint/explicit-function-return-type: "off" */
/* eslint no-return-assign: "off" */

import { Validator } from "./validators";

interface Protected<V> {
  defaultValue: V;
  value: V;
  valid: boolean;
  message: string;
  dirty: boolean;
  touched: boolean;
  focused: boolean;
  blurred: boolean;
  onChangeCallbacks: ((value: V) => void)[];
  changeHandler: (value: V) => void;
  checkValidity: () => void;
}

export default class FormInput<V> {
  get value(): V {
    return this._protected.value;
  }

  set value(value: V) {
    this._protected.value = value;
    this._protected.checkValidity();
    this._protected.changeHandler(this._protected.value);
  }

  get dirty(): boolean {
    return this._protected.dirty;
  }

  set dirty(dirty: boolean) {
    this._protected.dirty = dirty;
    this.onDirt(this._protected.dirty);
  }

  get touched(): boolean {
    return this._protected.touched;
  }

  set touched(touched: boolean) {
    this._protected.touched = touched;
    this.onTouch(this._protected.touched);
  }

  get focused(): boolean {
    return this._protected.focused;
  }

  set focused(focused: boolean) {
    this._protected.focused = focused;
    this.onFocus(this._protected.focused);
  }

  get blurred(): boolean {
    return this._protected.blurred;
  }

  set blurred(blurred: boolean) {
    this._protected.blurred = blurred;
    this.onBlur(this._protected.blurred);
  }

  get valid(): boolean {
    return this._protected.valid;
  }

  get message(): string {
    return this._protected.message;
  }

  validators: Validator<V>[] = [];

  onChange(callback: (value: V) => void): void {
    this._protected.onChangeCallbacks.push(callback);
  }

  onDirt(dirt: boolean): void {}

  onTouch(touch: boolean): void {}

  onFocus(focus: boolean): void {}

  onBlur(blur: boolean): void {}

  reset(): void {
    this._protected.value = this._protected.defaultValue;
    this._protected.dirty = false;
    this._protected.touched = false;
    this._protected.focused = false;
    this._protected.blurred = true;
    this._protected.changeHandler(this._protected.value);
    this.onDirt(this._protected.dirty);
    this.onTouch(this._protected.touched);
    this.onFocus(this._protected.focused);
    this.onBlur(this._protected.blurred);
  }

  constructor(value: V, validators: Validator<V>[] = []) {
    this._protected = {
      defaultValue: value,
      value,
      valid: false,
      message: "",
      dirty: false,
      touched: false,
      focused: false,
      blurred: true,
      onChangeCallbacks: [],
      changeHandler: (value) => {
        this._protected.onChangeCallbacks.forEach((fn) => fn(value));
      },
      checkValidity: () => {
        this._protected.message = "";
        this._protected.valid = true;
        for (let idx = 0; idx < this.validators.length; idx++) {
          const callback = this.validators[idx];
          const error: undefined | string = callback(this._protected.value);
          if (error) {
            this._protected.message = error;
            this._protected.valid = false;
            break;
          }
        }
      },
    };
    this.validators = validators;
    this._protected.checkValidity();
  }

  public _protected: Protected<V>;
}
