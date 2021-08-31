import React from "react";
import "./game-list.styles.css";

const GameList = ({ games }) => {
  //usually invalid username
  if (games.errors) {
    return <div>{games.errors.error.message["#text"]}</div>;
  }
  //collection items, null or undefined. Either collection is empty or fetch is qued at BGG api
  else if (games.items == null) {
    return null;
  }
  //no games in collection
  else if (games.items.item == null) {
    return <div>This user has no games in his collection</div>;
  }
  //we found a user who actually has games
  else
    return (
      <section className="listContainer">
        <h2 className="listHeader">List of Games</h2>
        <ul className="gameList" title="List of Games">
          {games.items.item.map((item) => {
            return (
              <li key={item["@attributes"].collid} className="gameListItem">
                {/* key is collid for now, change to objectid after cleaning up duplicates */}
                {item.name["#text"]}
              </li>
            );
          })}
        </ul>
      </section>
    );
};

export default GameList;
