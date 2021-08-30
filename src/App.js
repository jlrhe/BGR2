import React, { useState } from "react";
import "./App.css";
import GameList from "./components/game-list.component";
import InputTextfield from "./components/input-textfield.component";
import xmlToJson from "./functions/xmlToJson";

function App() {
  const [games, setGames] = useState({});
  const [status, setStatus] = useState("No collections loaded.");
  const [username, setUsername] = useState("");

  const updateUsername = (user) => {
    setUsername(user);
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
          setGames({});
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

  if (games.errors) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Board Game Randomizer 2</h1>
        </header>
        <InputTextfield
          handleInput={updateUsername}
          handleSubmit={fetchData}
        ></InputTextfield>
        <div>
          {status}
          <br />
          {games.errors.error.message["#text"]}
        </div>{" "}
      </div>
    );
  } else if (games.items == null) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Board Game Randomizer 2</h1>
        </header>
        <InputTextfield
          handleInput={updateUsername}
          handleSubmit={fetchData}
        ></InputTextfield>
        <div>{status}</div>
      </div>
    );
  } else if (games.items.item == null) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Board Game Randomizer 2</h1>
        </header>
        <InputTextfield
          handleInput={updateUsername}
          handleSubmit={fetchData}
        ></InputTextfield>
        <div>
          {status}
          <br />
          This user has no games in his collection
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Board Game Randomizer 2</h1>
        </header>
        <InputTextfield
          handleInput={updateUsername}
          handleSubmit={fetchData}
        ></InputTextfield>
        <div>{status}</div>
        <GameList games={games}></GameList>
      </div>
    );
  }
}

export default App;
