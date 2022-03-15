const express = require('express');
const app = express();
const Recipe = require('./../database/models/recipe.js');
const db = require('./../database/index.js');
const PORT = 3000;
const config = require('../config.js');
const APIURL = 'https://api.edamam.com/api/recipes/v2';
const APIAppKeyString = 'app_key=8197288156fefabf49057ca05ff60841';
const APIAppIDString = 'app_id=07fe85d3';

// FULL, UNBROKEN ADDRESS TO API
// 'https://api.edamam.com/api/recipes/v2?type=public&q=taco&app_id=07fe85d3&app_key=8197288156fefabf49057ca05ff60841'

app.use(express.json());
app.use(express.static(__dirname + '/../dist'));

app.get(`${APIURL}?type=public&q=taco&${APIAppIDString}&${APIAppKeyString}`, (req, res) => {
  console.log('this was the request:', req);
  res.status(200).send();
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});