const compression = require("compression");
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

let setCache = function (req, res, next) {
  const period = 600;
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${period}`);
  } else {
    res.set('Cache-control', `no-store`);
  }
  next();
}
app.use(setCache);
app.use(compression());
app.use(express.json());
app.use(express.static(__dirname + '/../dist'));

app.get('/recipes', (req, res) => {
  axios.get(`${APIURL}?type=public&q=${req.query.query}&${APIAppIDString}&${APIAppKeyString}&from=0&to=14`)
  .then(response => {
    let numberOfResults = response.data.hits.length;
    let topRecipes = [];
    if (numberOfResults !== 0) {
      if (numberOfResults >= 15) {
        for (let i = 0; i < 15; i++) {
          let currentRecipe = {
            name: response.data.hits[i].recipe.label,
            source: response.data.hits[i].recipe.source,
            photo: response.data.hits[i].recipe.image,
            website: response.data.hits[i].recipe.url,
            calories: Math.floor(response.data.hits[0].recipe.calories / response.data.hits[0].recipe.yield),
            servings: response.data.hits[0].recipe.yield,
            cooktime: response.data.hits[0].recipe.totalTime
          }
          topRecipes.push(currentRecipe);
        }
      } else if (numberOfResults < 15) {
        for (let i = 0; i < numberOfResults; i++) {
          let currentRecipe = {
            name: response.data.hits[i].recipe.label,
            source: response.data.hits[i].recipe.source,
            photo: response.data.hits[i].recipe.image,
            website: response.data.hits[i].recipe.url,
            calories: Math.floor(response.data.hits[0].recipe.calories / response.data.hits[0].recipe.yield),
            servings: response.data.hits[0].recipe.yield,
            cooktime: response.data.hits[0].recipe.totalTime
          }
          topRecipes.push(currentRecipe);
        }
      }
    }
    res.flush();
    res.status(200).send(topRecipes);
  })
  .catch(err => {
    console.log('FAILURE AT SERVER ENDPOINT:', err);
    res.status(500).send(err);
  })
})

app.get('/wishlist', (req, res) => {
  Recipe.find()
  .then(response => {
    res.flush();
    res.status(200).send(response);
  })
  .catch(err => {
    console.log('FAILURE AT SERVER ENDPOINT:', err);
    res.status(500).end();
  })
})

app.post('/wishlist', (req, res) => {
  const newRecipe = new Recipe({
    name: req.body.name,
    source: req.body.source,
    photo: req.body.photo,
    website: req.body.website,
    calories: req.body.calories,
    servings: req.body.servings,
    cooktime: req.body.cooktime
  });
  db.collections.recipes.updateOne(
    {
      name: newRecipe.name
    },
    {
      $setOnInsert: {
        name: newRecipe.name,
        source: newRecipe.source,
        photo: newRecipe.photo,
        website: newRecipe.website,
        calories: newRecipe.calories,
        servings: newRecipe.servings,
        cooktime: newRecipe.cooktime
      }
    },
    {
      upsert: true
    }
  )
  .then(response => {
    res.flush();
    res.status(201).send(response);
  })
  .catch(err => {
    console.log('FAILURE AT SERVER ENDPOINT:', err);
    res.status(500).end();
  })
})

app.delete('/wishlist', (req, res) => {
  db.collections.recipes.deleteOne({'name': req.query.recipeName})
  .then(response => {
    res.flush();
    res.status(204).send();
  })
  .catch(err => {
    console.log('FAILURE AT SERVER ENDPOINT:', err);
    res.status(500).end();
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});