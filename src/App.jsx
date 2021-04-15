import React, { useState, useEffect } from "react";
import "./App.css";

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const filtroResultados = (dataCompleta, letra) => {
    const result = dataCompleta.find((data) => data.Name.indexOf(letra) === -1);
    console.log(result);
  };

  const renderPokemon = (ev) => {
    let tecla = ev.target.value;
    // console.log(tecla);
    if (tecla) {
      fetch(URL_PATH)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            // setItems(result);
            filtroResultados(result, tecla);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  };

  //   useEffect(() => {}, []);

  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   } else if (!isLoaded) {
  //     return <div className="loader"></div>;
  //   } else {
  //   }
  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        onKeyPress={renderPokemon}
        onKeyDown={renderPokemon}
        onChange={renderPokemon}
      />
      <div className="loader"></div>
      <ul className="suggestions">
        {items.map(({ Name, Types, img }) => (
          <li>
            <img src={img} alt={`Imagen de ${Name}`} />
            <div className="info">
              <h1>{Name}</h1>
              <span className="type electric">{Types[0]}</span>
              <span className="type normal">{Types[1]}</span>
            </div>
          </li>
        ))}
        {/* <li>
            <img
              src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
              alt=""
            />
            <div className="info">
              <h1>
                <span className="hl">Pika</span>chu
              </h1>
              <span className="type electric">Electric</span>
              <span className="type normal">Normal</span>
            </div>
          </li>
          <li>
            <img
              src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
              alt=""
            />
            <div className="info">
              <h1 className="no-results">No results</h1>
            </div>
          </li> */}
      </ul>
    </>
  );
};

export default App;
