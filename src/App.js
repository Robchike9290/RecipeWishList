import React, { useEffect, useState } from "react";
const axios = require('axios');

const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  // STILL NEED TO VERIFY I WORK.  WORKING ON THE BACK END FOR ME.
  const getAllRecipes = () => {
    axios.get('/wishlist')
    .then(response => {
      console.log('SUCCESS AT SERVER ENDPOINT:', response);
      setMyRecipes(response.data);
    })
    .catch(err => {
      console.log('FAILURE AT SERVER ENDPOINT:', err);
    })
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleRecipeAdd = (recipe) => {
    console.log('hi');
    const modifiedRecipes = myRecipes.slice();
    modifiedRecipes.push(recipe);
    setMyRecipes(modifiedRecipes);
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log('this is the search query:', searchQuery);
    axios({
      method: 'get',
      url: '/recipes',
      params: {query: searchQuery}
    })
    .then(response => {
      console.log('this is the response from the endpoint:', response);
      setSearchResults(response.data)
    })
    .catch(err => {
      console.log('there was an error reaching the endpoint:', err);
    })
  }

  // STILL NEED TO VERIFY I WORK.  WORKING ON THE BACK END FOR ME.
  useEffect(() => {
    getAllRecipes();
  }, [searchResults])

  return (
    <div>
      <h1>
        THIS IS THE WISH LIST
      </h1>
      <h2>KEYWORD SEARCH</h2>
      <form>
        <input
          type="text"
          required
          placeholder="What do you have a hankering for?"
          onChange={handleChange}
          ></input>
        <button onClick={handleSubmitClick}>CLICK ME</button>
      </form>
      <h2>SEARCH RESULTS</h2>
      <ul>
        {searchResults.map((searchResult, index) =>
        <li key={index} onClick={handleRecipeAdd}>
          <div>Name: {searchResult.name}</div>
          <div>Source: {searchResult.source}</div>
          {/* NEED TO RESEARCH HOW TO GET PHOTO TO WORK */}
          <div>Photo: {searchResult.photo}</div>
          <div>Take Me To The Recipe! <a href={searchResult.website}>{searchResult.source}</a></div>
          <div>Calories: {searchResult.calories} per serving</div>
          <div>Servings: {searchResult.servings}</div>
          <div>Cook Time: {searchResult.cooktime} minutes</div>
          <br></br>
        </li>
      )}
      </ul>
      <h2>MY RECIPES</h2>
      <ul>
        {myRecipes.map((recipe, index) =>
        <li key={index}>
          <div>Name: {recipe.name}</div>
          <div>Source: {recipe.source}</div>
          {/* NEED TO RESEARCH HOW TO GET PHOTO TO WORK */}
          <div>Photo: {recipe.photo}</div>
          <div>Link: <a href={recipe.website}>{recipe.source}</a></div>
          <div>Calories: {recipe.calories} per serving</div>
          <div>Servings: {recipe.servings}</div>
          <div>Cook Time: {recipe.cooktime} minutes</div>
          <br></br>
        </li>
      )}
      </ul>
    </div>
  );

}

export default App;

// in the case that no recipes are returned...
// if (numberOfResults === 0) {
//   console.log("We don\'t have any recipes that match your keyword!");
// }