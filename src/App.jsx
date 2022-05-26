import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

const URL_PATH = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
  const [word, setWord] = useState();
  const [results, setResults] = useState();

  useEffect(() => {
    word &&
      fetch(URL_PATH)
        .then((result) => result.json())
        .then((data) => changeHandler(data.results, word));
  }, [word]);

  // useEffect(() => {
  //   results &&
  //   renderPokes()
  // }, [results]);

  const changeHandler = (data, word) => {
    let resultadosFitrados = [];
    data.forEach((res) => {
      let nombreMin = res.name.toLowerCase();
      let textoMin = word.toLowerCase();
      if (nombreMin.indexOf(textoMin) === 0) {
        resultadosFitrados.push(res);
      }
      setResults(resultadosFitrados);
    });
  };

  const renderPokes = () => {
    console.log(results);
    results && console.log(results.length);
    return results ? (
      results.map((item, index) => (
        <li key={index}>
          <div className="info">
            <h1>
              <span className="hl">{item.name}</span>
            </h1>
          </div>
        </li>
      ))
    ) : (
      <li>
        <img
          src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
          alt=""
        />
        <div className="info">
          <h1 className="no-results">No results</h1>
        </div>
      </li>
    )
  };

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
        onChange={(ev) => {
          setWord(ev.target.value);
        }}
      />
      <div className="loader"></div>
      <ul className="suggestions">
        {renderPokes()}
      </ul>
    </>
  );
};

export default App;
