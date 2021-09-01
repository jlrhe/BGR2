import React from "react";
import "./list.styles.css";

//use some other key if the items are not unique
const List = ({ listItems, title }) => {
  return (
    <div className="list-component-container">
      <h3>{title}</h3>
      <ul className="list-component-list">
        {listItems.map((item) => (
          <li className="list-component-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
