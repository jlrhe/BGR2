import React, { useState } from "react";
import "./input-textfield.styles.css";

const InputTextfield = ({ handleInput }) => {
  const [inputfield, setInputfield] = useState("");

  const handleFieldChange = (event) => {
    console.log(event.target.value);
    setInputfield(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleInput(inputfield);
  };

  return (
    <form onSubmit={handleSubmit}>
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
