import React, { useState } from "react";
import "./App.css";
import GameList from "./components/game-list.component";
import InputTextfield from "./components/input-textfield.component";
import xmlToJson from "./functions/xmlToJson";
import Button from "./components/button.component";
import PickedGame from "./components/picked-game.component";
import List from "./components/list.component";

//I should write a useEffect to check if the collection has games, user exists etc and set a state accordingly. This would simplify error handling.
function App() {
  const [games, setGames] = useState({});
  const [status, setStatus] = useState("No collections loaded.");
  const [username, setUsername] = useState("");
  const [randomGame, setRandomGame] = useState(-1);
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const updateUsername = (user) => {
    setUsername(user);
  };
  const clearCollection = () => {
    setGames({});
    setRandomGame(-1);
    setFetchedUsers([]);
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
    setRandomGame(-1);
    //I have to look around if there's a nicer way to break out ot .then statements than throwing an error
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
          if (fetchedUsers.includes(username)) {
            setStatus("This users collection has already been fetched.");
            throw new Error("This users collection has already been fetched.");
          }
          setStatus(`Collection fethced.`);
          let fetchedUser = [username];
          setFetchedUsers(fetchedUsers.concat(fetchedUser));
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
        //returned JSON will have .errors if the username is invalid.
        //Valid user without a collection will have .items, but will not have .items.item
        let newGames = xmlToJson(xmlDoc);
        //no valid collections fetched yet.
        if (!games.items) {
          setGames(newGames);
        }
        //no games found yet.
        else if (games.items.item == null) {
          setGames(newGames);
        }
        //this should mean there are already games in a fetched collection (I really need to refactor a bit to make error checking easier and more robust)
        //check if the newly fetched collection has games
        else if (newGames.items && newGames.items.item) {
          //I have to remember this clever way of deep copying an object
          let combinedGames = JSON.parse(JSON.stringify(games));
          newGames.items.item.forEach((element) =>
            combinedGames.items.item.push(element)
          );
          setGames(combinedGames);
        } else {
          setStatus(
            "Invalid username or the user didn't have any games in his/her collection."
          );
        }
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
      <List listItems={fetchedUsers} title="Fetched Users"></List>
      <GameList games={games}></GameList>
    </div>
  );
}

export default App;
