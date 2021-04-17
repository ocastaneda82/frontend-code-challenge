import React, { useState } from "react";
import ReactDOM from "react-dom";
// import App from "./App.jsx";
import "./App.css";

const Resultado = ({ img, Name, Types }) => {
  return (
    <>
      <li>
        <img src={img} alt={`Imagen de ${Name}`} />
        <div className="info">
          <h1>{Name}</h1>
          <span className="type electric">{Types[0]}</span>
          <span className="type normal">{Types[1]}</span>
        </div>
      </li>
    </>
  );
};
const NoResultado = () => {
  return (
    <>
      <li>
        <img
          src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
          alt=""
        />
        <div className="info">
          <h1 className="no-results">No results</h1>
        </div>
      </li>
    </>
  );
};

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const Resultados = ({ maximus, textoFiltrar }) => {
  const [items, setItems] = useState([]);
  if (textoFiltrar) {
    fetch(URL_PATH)
      .then((res) => res.json())
      .then(
        (result) => {
          filtroResultados(result, textoFiltrar);
        },
        (error) => {}
      );
  }
  function filtroResultados(result, textoFiltrar) {
    const resultadosFitrados = [];
    result.forEach((res) => {
      let nombreMin = res.Name.toLowerCase();
      let textoMin = textoFiltrar.toLowerCase();
      if (nombreMin.indexOf(textoMin) === 0) {
        resultadosFitrados.push(res);
      }
    });
    setItems(resultadosFitrados);
  }

  const resultado = items.map(({ img, Name, Types }) => (
    <Resultado img={img} Name={Name} Types={Types} />
  ));
  console.log(items.length);
  if (resultado.length > 0) {
    return <ul className="suggestions">{resultado}</ul>;
  } else {
    return (
      <ul className="suggestions">
        <NoResultado />
      </ul>
    );
  }
};
const Buscador = ({ maximus, textoFiltrar, clickHandler }) => {
  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" checked={maximus} />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        // value={textoFiltrar}
        onChange={(ev) => {
          clickHandler(ev.target.value);
        }}
      />
    </>
  );
};
const App = () => {
  const [textoFiltrar, setTextoFiltrar] = useState("");
  const [maximus, setMaximus] = useState(false);
  //   const [items, setItems] = useState([]);

  return (
    <>
      <Buscador
        maximus={maximus}
        textoFiltrar={textoFiltrar}
        clickHandler={(cambio) => {
          setTextoFiltrar(cambio);
        }}
        manejarCheck={(check) => {
          setMaximus(check);
        }}
      />
      <Resultados textoFiltrar={textoFiltrar} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
