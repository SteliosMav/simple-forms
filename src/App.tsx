import { useEffect } from "react";
import TextInput from "./components/TextIntput";
import { Form, FormInput, validators } from "./forms";

function App() {
  const form = new Form({
    email: new FormInput<string>("tes", [
      validators.minLength(3),
      validators.email,
    ]),
    password: new FormInput<string>("tes", [
      validators.minLength(3),
      validators.email,
    ]),
    name: new FormInput<string>("tes", [
      validators.minLength(3),
      validators.email,
    ]),
  });
  useEffect(() => {
    form.inputs.email.onChange((value) =>
      console.log("Parent: Input changed: ", value)
    );
    form.onChange((value) => {
      console.log("Form value changed", value, form);
    });
  }, []);
  console.log(form);
  setTimeout(() => (form.inputs.email.value = "ye@gmail.com"), 5000);

  return (
    <>
      <TextInput formInput={form.inputs.email} />
    </>
  );
}

export default App;
