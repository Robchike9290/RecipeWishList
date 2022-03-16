const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  source: String,
  photo: String,
  link: String,
  calories: Number,
  cookTime: Number
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;