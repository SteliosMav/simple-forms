import { ChangeEvent, useEffect, useState } from "react";
import { FormInput } from "../forms";

interface TextInputProps {
  formInput: FormInput<string>;
}

const TextInput = ({ formInput }: TextInputProps) => {
  const [value, setValue] = useState(formInput.value);
  const [blurred, setBlurred] = useState(formInput.blurred);
  const [focused, setFocused] = useState(formInput.focused);
  const [touched, setTouched] = useState(formInput.touched);
  const [dirty, setDirty] = useState(formInput.dirty);
  const [valid, setValid] = useState(formInput.valid);
  const [message, setMessage] = useState(formInput.message);

  useEffect(() => {
    formInput.onChange((value) => {
      setValue(value);
      formInput.dirty = true;
      setDirty(true);
      setValid(formInput.valid);
      setMessage(formInput.message);
      console.log("Child: Input changed: ", value);
    });
  }, []);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    formInput.value = newValue;
    formInput.dirty = true;
  };
  const blurHandler = () => {
    formInput.blurred = true;
    formInput.focused = false;
    formInput.touched = true;
    setBlurred(true);
    setFocused(false);
    setTouched(true);
  };
  const focusHandler = () => {
    formInput.focused = true;
    formInput.blurred = false;
    setFocused(true);
    setBlurred(false);
  };

  return (
    <div id="text-input">
      <strong>Username Input</strong>
      <input
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        type="text"
      />
      <ul>
        <strong>Attributes</strong>
        <li>Blurred: {blurred ? "true" : "false"}</li>
        <li>Focused: {focused ? "true" : "false"}</li>
        <li>Touched: {touched ? "true" : "false"}</li>
        <li>Dirty: {dirty ? "true" : "false"}</li>
        <li>Valid: {valid ? "true" : message}</li>
      </ul>
    </div>
  );
};

export default TextInput;
