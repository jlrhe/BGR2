import React from "react";
import "./picked-game.styles.css";

const PickedGame = ({ games, randomGame }) => {
  if (randomGame === -1) {
    return <></>;
  } else {
    return (
      <div className="pickedGame">
        How about a game of <br />
        {games.items.item[randomGame].name["#text"]}
      </div>
    );
  }
};
export default PickedGame;
