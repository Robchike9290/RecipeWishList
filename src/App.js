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

  const handleRecipeDelete = (id, recipeName) => {
    axios({
      method: 'delete',
      url: '/wishlist',
      params: {
        recipeName: recipeName,
        id: id
      }
    })
    .then(response => {
      const modifiedRecipes = myRecipes.slice();
      for (let i = 0; i < modifiedRecipes.length; i++) {
        let modifiedRecipeName = modifiedRecipes[i].name;
        if (modifiedRecipeName === recipeName) {
          modifiedRecipes.splice(i, 1);
        }
      }
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
        RECIPE WISH LIST - Your virtual cookbook.
      </h1>
      <h2>KEYWORD SEARCH - If you're just DYING to find new recipes, search for them here!</h2>
      <form>
        <input
          type="text"
          required
          placeholder="What are you craving?  I can handle multiple words at once!"
          onChange={handleChange}
          ></input>
        <button id="searchButton" onClick={handleSubmitClick}>LET'S GET SOME RECIPES!</button>
      </form>
      <div>
        <span>{searchResults.length !== 0 ?
          <h2>SEARCH RESULTS - Our 15 top remedies to cure your hangriness today!</h2>
          :
          null
        }</span>
      </div>
      {/* CONDITIONALLY RENDER THIS CONTAINER WHEN THE SEARCH IS EMPTY */}
      <div>
        <span>{searchResults.length !== 0 ?
          <div className="container">
            {searchResults.map((searchResult, index) =>
            <div key={index} className="recipe">
              <div className="info">Name: {searchResult.name}</div>
              <div className="info">Source: {searchResult.source}</div>
              <img src={searchResult.photo} alt="Food photo could not be shown! 🦞️"></img>
              <div className="info">Calories: {searchResult.calories} per serving</div>
              <div className="info">Servings: {searchResult.servings}</div>
              <div>
                <span>{searchResult.cooktime !== 0 ?
                <div className="info">Cook Time: {searchResult.cooktime} minutes</div>
                :
                null
                }</span>
              </div>
              <div className="info">
              LIKE WHAT YOU SEE? CLICK HERE FOR THE RECIPE: <a href={searchResult.website} target="_blank">{searchResult.source}</a>
              </div>
              <button onClick={() => handleRecipeAdd(searchResult)}>ADD THIS TO MY RECIPES</button>
              <br></br>
            </div>
            )}
          </div>
          :
            null
        }</span>
      </div>
      <h2>YOUR RECIPES - A snapshot of your refined palette, here when you need it.</h2>
      <div className="container">
        {myRecipes.map((recipe, index) =>
        <span key={index} className="recipe">
          <div className="info">Name: {recipe.name}</div>
          <div className="info">Source: {recipe.source}</div>
          <img src={recipe.photo} alt="Food photo could not be shown! 🦞️"></img>
          <div className="info">Calories: {recipe.calories} per serving</div>
          <div className="info">Servings: {recipe.servings}</div>
          <div>
            <span>{recipe.cooktime !== 0 ?
            <div className="info">Cook Time: {recipe.cooktime} minutes</div>
            :
            null
            }</span>
          </div>
          <div className="info">HANGRY? CLICK HERE FOR THE RECIPE: <a href={recipe.website} target="_blank">{recipe.source}</a></div>
          <button id="removeButton" onClick={() => handleRecipeDelete(recipe._id, recipe.name)}>REMOVE THIS FROM MY RECIPES</button>
          <br></br>
        </span>
      )}
      </div>
    </div>
  );

}

export default App;