import React from "react";
const axios = require('axios');

const App = () => {

  const handleClick = () => {
    console.log('I AM THE BUTTON.  HERE IS WHAT I DO...');
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
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  );

}

export default App;