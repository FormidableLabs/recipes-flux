var low = require('lowdb');
var db = low('db.json');

module.exports = {
  createRecipe: function (recipe) {
    return db('recipes').push(recipe);
  },
  deleteRecipe: function (id) {
    return db('recipes').remove({_id: id});
  },
  getRecipe: function (id) {
    return db('recipes').find({ _id: id});
  },
  getRecipes: function () {
    return db('recipes');
  },
  updateRecipe: function (recipe) {
    return db('recipes')
      .chain()
      .find({ _id: recipe._id })
      .assign({ingredients: recipe.ingredients});
  }
}