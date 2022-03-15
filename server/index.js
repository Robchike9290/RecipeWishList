const express = require('express');
const app = express();
const Recipe = require('./../database/models/recipe.js');
const db = require('./../database.index.js');
const PORT = 3000;
const config = require('./config.js');

app.use(express.json());
app.use(express.static(__dirname + '/../dist'));

app.get('/', (req, res) => {
  res.status(200).send();
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});