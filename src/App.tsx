import { useEffect } from "react";
import TextInput from "./components/TextIntput";
import { Form, FormInput, validators } from "./forms";

function App() {
  const form = new Form({
    formInput: new FormInput<string>("tes", [
      validators.minLength(3),
      validators.email,
    ]),
  });
  useEffect(() => {
    form.inputs.formInput.onChange((value) =>
      console.log("Parent: Input changed: ", value)
    );
    form.onChange((value) => {
      console.log("Form value changed", value);
    });
  }, []);
  console.log(form);
  setTimeout(() => console.log(form.value), 5000);

  return (
    <>
      <TextInput formInput={form.inputs.formInput} />
    </>
  );
}

export default App;
