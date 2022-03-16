import React, { useEffect, useState } from "react";
const axios = require('axios');

const App = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault();
    axios.get('/recipes')
    .then(response => {
      console.log('this is the response from the endpoint:', response);
    })
    .catch(err => {
      console.log('there was an error reaching the endpoint:', err);
    })
  }

  return (
    <div>
      <h1>
        THIS IS THE RECIPE WISH LIST
      </h1>
      <h2>KEYWORD SEARCH</h2>
      <form>
        <input
          type="text"
          required
          placeholder="What do you have a hankering for?"
          onChange={handleChange}
          ></input>
        <button onClick={handleClick}>CLICK ME</button>
      </form>
    </div>
  );

}

export default App;