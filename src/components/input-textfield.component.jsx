import React, { useEffect, useState } from "react";
import "./input-textfield.styles.css";

const InputTextfield = ({ handleInput, handleSubmit }) => {
  const [inputfield, setInputfield] = useState("");

  const handleFieldChange = (event) => {
    setInputfield(event.target.value);
  };
  const submit = (event) => {
    event.preventDefault();
    handleSubmit(inputfield);
  };
  useEffect(() => {
    handleInput(inputfield);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputfield]);

  return (
    <form onSubmit={submit}>
      <label htmlFor="usernameinput">BGG Username: </label>
      <input
        id="usernameinput"
        value={inputfield}
        onChange={handleFieldChange}
      />
      <button type="submit">Fetch Collection</button>
    </form>
  );
};
export default InputTextfield;
