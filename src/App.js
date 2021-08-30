import React, { useEffect, useState } from "react";
import "./App.css";
import GameList from "./components/game-list.component";
import InputTextfield from "./components/input-textfield.component";
import xmlToJson from "./functions/xmlToJson";
//import Button from "./components/button.component";

function App() {
  const [games, setGames] = useState({});
  const [status, setStatus] = useState("No collections loaded.");
  const [username, setUsername] = useState("");

  const updateUsername = (user) => {
    setUsername(user);
  };

  useEffect(() => {
    if (username === "") {
    } else
      fetch(
        `https://frozen-dawn-34650.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&own=1`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Board Game Geek api or the Internet is on a break. Check your internet connection or try again later."
            );
          }
          if (response.status === 202) {
            setStatus(
              "Board Game Geek API is processing your request. Try again in a second"
            );
            throw new Error(
              "Board Game Geek API is processing your request. Try again in a second"
            );
          }
          if (response.status === 200) {
            setStatus(`Collection fethced.`);
            return response.text();
          } else {
            throw new Error("Something weird happened");
          }
        })
        .then((xmlString) => {
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(xmlString, "text/xml");
          console.log(JSON.stringify(xmlToJson(xmlDoc)));
        })
        .catch((error) => {
          console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // Changes XML to JSON, copied from: https://davidwalsh.name/convert-xml-json

  return (
    <div className="App">
      <header className="App-header">
        <h1>Board Game Randomizer 2</h1>
      </header>
      <div>{status}</div>
      <InputTextfield handleInput={updateUsername}></InputTextfield>
      {/* <Button
        type="fetch"
        handleClick={fetchGames}
        text="Fetch collection"
      ></Button> */}
      <GameList games={games}></GameList>
    </div>
  );
}

export default App;
