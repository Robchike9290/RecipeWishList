const express = require('express');
const axios = require('axios');

const db = require('./../database/index.js');
const Recipe = require('./../database/models/recipe.js');

const { APP_ID, APP_KEY } = require('../config.js');
const APIURL = 'https://api.edamam.com/api/recipes/v2';
const APIAppKeyString = `app_key=${APP_KEY}`;
const APIAppIDString = `app_id=${APP_ID}`;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/../dist'));

app.get('/recipes', (req, res) => {
  console.log('here is the request query:', req.query, 'end of request');
  axios.get(`${APIURL}?type=public&q=${req.query.query}&${APIAppIDString}&${APIAppKeyString}`)
  .then(response => {
    console.log("number of hits:", response.data.hits.length);
    let numberOfResults = response.data.hits.length;
    let topRecipes = [];
    if (numberOfResults !== 0) {
      if (numberOfResults >= 5) {
        for (let i = 0; i < 5; i++) {
          let currentRecipe = {
            name: response.data.hits[i].recipe.label,
            source: response.data.hits[i].recipe.source,
            photo: response.data.hits[i].recipe.image,
            link: response.data.hits[i].recipe.url,
            calories: response.data.hits[0].recipe.calories / response.data.hits[0].recipe.yield,
            cooktime: response.data.hits[0].recipe.totalTime
          }
          topRecipes.push(currentRecipe);
        }
      } else if (numberOfResults < 5) {
        for (let i = 0; i < numberOfResults; i++) {
          let currentRecipe = {
            name: response.data.hits[i].recipe.label,
            source: response.data.hits[i].recipe.source,
            photo: response.data.hits[i].recipe.image,
            link: response.data.hits[i].recipe.url,
            calories: response.data.hits[0].recipe.calories / response.data.hits[0].recipe.yield,
            cooktime: response.data.hits[0].recipe.totalTime
          }
          topRecipes.push(currentRecipe);
        }
      }
    }
    console.log("top recipes", topRecipes);
    // Make sure to add in response for when no recipes mathcing the keyword are found.
    // test to see if there was a server response - remove when this works.
    // console.log('this was the name of the first recipe in the response:', response.data.hits[0].recipe.label);
    // console.log('this was the link to the first recipe in the resopnse:', response.data.hits[0].recipe.url);
    // console.log('this was the source page of the first recipe in the response:', response.data.hits[0].recipe.source);
    // console.log('this was the photo for the first recipe in the response:', response.data.hits[0].recipe.image);
    // console.log('this was the caloric content per serivng of the first recipe in the response:', response.data.hits[0].recipe.calories / response.data.hits[0].recipe.yield);
    // console.log('this was the cook time for the first recipe in the response:', response.data.hits[0].recipe.totalTime)
    // placeholder for test object for save.  Replace with information in response once this works.
    // let newRecipe = new Recipe({
    //   name: 'Testipe',
    //   photo: 'I have no photo becuase I do not exist',
    //   link: 'You can\'t find me becuase I\'m not real',
    //   calories: 'None, becuase I am just a concept.'
    // });
    // console.log('this is the new recipe:', newRecipe);
    // newRecipe.save()
    console.log('API successfully queried for recipes!');
    res.status(200).send(topRecipes);
  })
  .catch(err => {
    console.log('ERROR.  See response:', err);
    res.status(500).send(err);
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});