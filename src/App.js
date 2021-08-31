import React, { useState } from "react";
import "./App.css";
import GameList from "./components/game-list.component";
import InputTextfield from "./components/input-textfield.component";
import xmlToJson from "./functions/xmlToJson";
import Button from "./components/button.component";
import PickedGame from "./components/picked-game.component";

function App() {
  const [games, setGames] = useState({});
  const [status, setStatus] = useState("No collections loaded.");
  const [username, setUsername] = useState("");
  const [randomGame, setRandomGame] = useState(-1);

  const updateUsername = (user) => {
    setUsername(user);
  };
  const clearCollection = () => {
    setGames({});
    setRandomGame(-1);
  };
  const pickRandomGame = () => {
    let randomNumber = Math.floor(
      Math.random() * Object.keys(games.items.item).length
    );
    setRandomGame(randomNumber);
    console.log(
      "random: ",
      Math.floor(Math.random() * Object.keys(games.items.item).length)
    );
  };

  const fetchData = () => {
    fetch(
      `https://frozen-dawn-34650.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&own=1`
    )
      .then((response) => {
        if (!response.ok) {
          setStatus(
            "Board Game Geek api or the Internet had a break. You can always try again."
          );
          throw new Error(
            "Board Game Geek api or the Internet had a break. You can always try again."
          );
        }
        if (response.status === 202) {
          setStatus(
            "Board Game Geek API is processing your request. Try again in a second."
          );

          throw new Error(
            "Board Game Geek API is processing your request. Try again in a second."
          );
        }
        if (response.status === 200) {
          setStatus(`Collection fethced.`);
          return response.text();
        } else {
          setStatus(`Something weird happened. Statuscode: ${response.status}`);
          throw new Error(
            `Something weird happened. Statuscode: ${response.status}`
          );
        }
      })
      .then((xmlString) => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xmlString, "text/xml");
        let jsonObj = xmlToJson(xmlDoc);
        setGames(jsonObj);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Board Game Randomizer 2</h1>
      </header>
      <div>{status}</div>
      <InputTextfield
        handleInput={updateUsername}
        handleSubmit={fetchData}
      ></InputTextfield>
      <Button
        type="pickRandom"
        handleClick={pickRandomGame}
        text="Pick a Random Game"
        disabled={!games.items}
      ></Button>
      <PickedGame games={games} randomGame={randomGame}></PickedGame>
      <br />
      <Button
        type="clear"
        handleClick={clearCollection}
        text="Clear Collection"
        disabled={!games.items}
      ></Button>
      <GameList games={games}></GameList>
    </div>
  );
}

export default App;
