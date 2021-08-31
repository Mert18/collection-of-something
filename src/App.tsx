import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<any>([]);

  const fetchPokemons = async () => {
    let firstNum = Math.trunc(Math.random() * 350) + 1;
    let secondNum = firstNum + 20;
    for (let i = firstNum; i < secondNum; i++) {
      const pokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      ).then((response) => response.json());
      list.push(pokemon);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);
  return (
    <div className="App">
      <div className="header">
        <div className="header-input">
          <input type="text" onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="header-filters">
          <ul className="filter-list">
            <li>Power Rangers</li>
            <li>Purple Fighters</li>
            <li>Orange Warriors</li>
            <li>Hijacked Old Men</li>
          </ul>
        </div>
      </div>

      <div className="main">
        <ul className="card-list">
          {list.map((card) => (
            <li key={card.id} className="card">
              <h2>{card.name}</h2>
              <p>Experience: {card.base_experience}</p>
              <p>Weight: {card.weight}</p>
              <p>Height: {card.height}</p>
              <img
                src={card.sprites.other.dream_world.front_default}
                width="150px"
                height="150px"
              />
            </li>
          ))}
          ;
        </ul>
      </div>
    </div>
  );
}

export default App;
