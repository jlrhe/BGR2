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
      <br />
      <input
        id="usernameinput"
        className="usernameInput"
        value={inputfield}
        onChange={handleFieldChange}
      />
      <br />
      <button className="fetchButton" type="submit">
        Fetch Collection
      </button>
    </form>
  );
};
export default InputTextfield;
