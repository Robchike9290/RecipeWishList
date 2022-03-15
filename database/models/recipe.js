const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  name: String,
  photo: String
  link: String,
  calories: String,
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;