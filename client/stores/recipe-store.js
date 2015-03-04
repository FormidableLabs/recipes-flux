var Biff = require("../biff");
var _ = require("lodash");

// Creates a DataStore
var RecipeStore = Biff.createStore({
  // Initial setup
  _recipes: [],

  updateRecipeIngredientList: function (_id, index) {
    var recipe = this.getRecipe(_id);
    if (index || index === 0) {
      // Delete operation
      recipe.ingredients.splice(index, 1);
    } else {
      // Create operation
      recipe.ingredients.push(
        {
          ingredient: "",
          quantity: "",
          measurement: "",
          modifier: ""
        }
      );
    }
  },

  updateRecipe: function (data) {
    var recipe = this.getRecipe(data._id);
    if (data.index || data.index === 0) {
      recipe.ingredients[data.index][data.accessor] = data.value;
    } else {
      recipe[data.accessor] = data.value;
    }
  },

  updatePortions: function (data) {
    // TODO: validate data
    var recipe = this.getRecipe(data._id);

    if (recipe.portions !== data.portions) {
      var multiplier = data.portions / recipe.portions;
      recipe.ingredients.map(function (ing) {
        ing.quantity = ing.quantity * multiplier;
      });

      recipe.portions = data.portions;
    }
  },

  loadRecipes: function (recipes) {
    this._recipes = recipes;
  },

  createRecipe: function (recipe) {
    this._recipes.push(recipe);
  },

  createIngredient: function () {},

  deleteRecipe: function (_id) {
    _.remove(this._recipes, { _id: _id });
  },

  getRecipe: function (_id) {
    return _.find(this._recipes, { _id: _id });
  },

  getRecipes: function () {
    return this._recipes;
  }
}, function (payload) {
  if (payload.actionType === "RECIPE_CREATE") {
    this.createRecipe(payload.data);
    this.emitChange();
  }
  if (payload.actionType === "RECIPE_DELETE") {
    this.deleteRecipe(payload.data._id);
    this.emitChange();
  }
  if (payload.actionType === "RECIPES_LOAD") {
    this.loadRecipes(payload.data);
    this.emitChange();
  }
  if (payload.actionType === "INPUT_CHANGED") {
    this.updateRecipe({
      _id: payload.data._id,
      accessor: payload.data.accessor,
      index: payload.data.index,
      value: payload.data.value
    });
    this.emitChange();
  }
  if (payload.actionType === "INGREDIENT_DELETED") {
    this.updateRecipeIngredientList(
      payload.data._id, payload.data.index
    );
    this.emitChange();
  }
  if (payload.actionType === "INGREDIENT_CREATED") {
    RecipeStore.updateRecipeIngredientList(payload.data._id);
    RecipeStore.emitChange();
  }
  if (payload.actionType === "PORTIONS_CHANGED") {
    RecipeStore.updatePortions(payload.data);
    RecipeStore.emitChange();
  }
});

module.exports = RecipeStore;
