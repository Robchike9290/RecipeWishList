const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  source: String,
  photo: String,
  website: String,
  calories: Number,
  servings: Number,
  cooktime: Number
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;