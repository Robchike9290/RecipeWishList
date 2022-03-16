const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  name: String,
  source: String,
  photo: String,
  link: String,
  calories: Number,
  cookTime: Number
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;