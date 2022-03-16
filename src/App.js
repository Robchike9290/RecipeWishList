import React, { useEffect, useState } from "react";
const axios = require('axios');

const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  const getAllMyRecipes = () => {
    axios.get('/wishlist')
    .then(response => {
      setMyRecipes(response.data);
    })
    .catch(err => {
      console.log('FAILURE AT CLIENT ENDPOINT:', err);
    })
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleRecipeAdd = (recipe) => {
    axios({
      method: 'post',
      url: '/wishlist',
      data: recipe
    })
    .then(response => {
      const modifiedRecipes = myRecipes.slice();
      if (modifiedRecipes.length !== 0) {
        let mismatchCount = 0;
        for (let i = 0; i < modifiedRecipes.length; i++) {
          if (JSON.stringify(recipe.website) !== JSON.stringify(modifiedRecipes[i].website)) {
            mismatchCount++;
          }
        }
        if (mismatchCount === modifiedRecipes.length) {
          modifiedRecipes.push(recipe);
        }
      } else {
        modifiedRecipes.push(recipe);
      }
      setMyRecipes(modifiedRecipes);
    })
    .catch(err => {
      console.log('FAILURE AT CLIENT ENDPOINT:', err);
    })
  }

  const handleRecipeDelete = (key, recipeName) => {
    axios({
      method: 'delete',
      url: '/wishlist',
      data: recipeName
    })
    .then(response => {
      console.log('SUCCESS AT CLIENT ENDPOINT:', response);
      const modifiedRecipes = myRecipes.slice();
      modifiedRecipes.splice(key, 1);
      setMyRecipes(modifiedRecipes);
    })
    .catch(err => {
      console.log('FAILURE AT CLIENT ENDPOINT:', err);
    })
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    axios({
      method: 'get',
      url: '/recipes',
      params: {query: searchQuery}
    })
    .then(response => {
      setSearchResults(response.data);
      if(response.data.length === 0) {
        alert('No recipes matched your search criteria!  Try with another term before you get too hangry.');
      }
    })
    .catch(err => {
      console.log('FAILURE AT CLIENT ENDPOINT:', err);
    })
  }

  // ADD CONTROLLER HERE TO BE PASSED TO EFFECT FUNCTION AND ABORTED.
  useEffect(() => {
    getAllMyRecipes();
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
        <li key={index}>
          <div>Name: {searchResult.name}</div>
          <div>Source: {searchResult.source}</div>
          {/* NEED TO RESEARCH HOW TO GET PHOTO TO WORK */}
          <div>Photo: {searchResult.photo}</div>
          <div>Calories: {searchResult.calories} per serving</div>
          <div>Servings: {searchResult.servings}</div>
          {/* NEED TO MAKE THIS FIELD DISAPPEAR IF COOK TIME IS NOT INCLUDED IN THE METADATA FOR A RECIPE */}
          <div>Cook Time: {searchResult.cooktime} minutes</div>
          <div>
            TAKE ME TO THE RECIPE, I'M HUNGRY! <a href={searchResult.website} target="_blank">{searchResult.source}</a>
          </div>
          <button onClick={() => handleRecipeAdd(searchResult)}>Add this to my recipes</button>
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
          <div>Calories: {recipe.calories} per serving</div>
          <div>Servings: {recipe.servings}</div>
          <div>Cook Time: {recipe.cooktime} minutes</div>
          <div>TAKE ME TO THE RECIPE, I'M HUNGRY! <a href={recipe.website} target="_blank">{recipe.source}</a></div>
          <button onClick={() => handleRecipeDelete(key, recipe.name)}>Remove this from my recipes</button>
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