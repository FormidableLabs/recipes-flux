var Biff = require("../biff");

var RecipeActions = Biff.createActions({
  recipeCreated: function (data) {
    this.dispatch({
      actionType: "RECIPE_CREATE",
      data: data
    });
  },
  recipeDeleted: function (data) {
    this.dispatch({
      actionType: "RECIPE_DELETE",
      data: data
    });
  },
  portionsChanged: function (data) {
    this.dispatch({
      actionType: "PORTIONS_CHANGED",
      data: data
    });
  },
  inputChanged: function (data) {
    this.dispatch({
      actionType: "INPUT_CHANGED",
      data: data
    });
  },
  ingredientDeleted: function (data) {
    this.dispatch({
      actionType: "INGREDIENT_DELETED",
      data: data
    });
  },
  ingredientCreated: function (data) {
    this.dispatch({
      actionType: "INGREDIENT_CREATED",
      data: data
    });
  }
});

module.exports = RecipeActions;
