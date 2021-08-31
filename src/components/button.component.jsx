import React from "react";
import "./button.styles.css";

const Button = ({
  type,
  handleClick,
  text,
  disabled = false,
  hidden = false,
}) => {
  if (hidden) {
    return <></>;
  } else
    return (
      <button disabled={disabled} className={type} onClick={handleClick}>
        {text}
      </button>
    );
};

export default Button;
