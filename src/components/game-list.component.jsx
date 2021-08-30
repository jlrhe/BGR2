import React from "react";
import "./game-list.styles.css";

const GameList = ({ games }) => {
  return (
    <section className="listContainer">
      <h2 className="listHeader">List of Games</h2>
      <dl className="gameList" title="List of Games">
        <dt className="gameListItem">Game</dt>
        <dd className="gamelistItemDescription">Description</dd>
      </dl>
    </section>
  );
};

export default GameList;
