import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

const URL_PATH = 'https://pokeapi.co/api/v2/pokemon/';

const App = () => {
  const [results, setResults] = useState();

  async function fetchDataB() {
    let response = await fetch(URL_PATH);
    let data = response.json();
    return data;
  }

  async function handleChange(value) {
    let response = await fetchDataB();
    const filteredData = changeHandler(response.results, value);
    console.log(filteredData.length);
    value.length > 0 ? setResults(filteredData) : setResults();
  }

  // const fetchData = (value) => {
  //   value.length > 0
  //     ? fetch(URL_PATH)
  //         .then((response) => {
  //           return response.json();
  //         })
  //         .then((data) => {
  //           const filteredData = changeHandler(data.results, value);
  //           setResults(filteredData);
  //         })
  //     : setResults();
  // };

  const changeHandler = (data, word) => {
    let resultadosFitrados = [];
    data.forEach((res) => {
      let nombreMin = res.name.toLowerCase();
      let textoMin = word.toLowerCase();
      if (nombreMin.indexOf(textoMin) === 0) {
        resultadosFitrados.push(res);
      }
    });
    return resultadosFitrados;
  };

  const renderPokes = () => {
    return results ? (
      results.map((item, index) => (
        <li key={index}>
          <div className='info'>
            <h1>
              <span className='hl'>{item.name}</span>
            </h1>
          </div>
        </li>
      ))
    ) : (
      <li>
        <img
          src='https://cyndiquil721.files.wordpress.com/2014/02/missingno.png'
          alt=''
        />
        <div className='info'>
          <h1 className='no-results'>No results</h1>
        </div>
      </li>
    );
  };

  return (
    <>
      <label htmlFor='maxCP' className='max-cp'>
        <input type='checkbox' id='maxCP' />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type='text'
        className='input'
        placeholder='Pokemon or type'
        onChange={(ev) => {
          // fetchData(ev.target.value);
          handleChange(ev.target.value);
        }}
      />
      <div className='loader'></div>
      <ul className='suggestions'>{renderPokes()}</ul>
    </>
  );
};

export default App;
