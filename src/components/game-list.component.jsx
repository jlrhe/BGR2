import React from "react";
import "./game-list.styles.css";

const GameList = ({ games }) => {
  return (
    <section className="listContainer">
      <h2 className="listHeader">List of Games</h2>
      <ul className="gameList" title="List of Games">
        {games.items.item.map((item) => {
          return (
            <li key={item["@attributes"].collid} className="gameListItem">
              {item.name["#text"]}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default GameList;
