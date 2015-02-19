var McFly = require("../McFly");

var RecipeActions = McFly.createActions({
  recipeCreated: function (data) {
    return {
      actionType: "RECIPE_CREATE",
      data: data
    };
  },
  recipeDeleted: function (data) {
    return {
      actionType: "RECIPE_DELETE",
      data: data
    };
  },
  portionsChanged: function (data) {
    return {
      actionType: "PORTIONS_CHANGED",
      data: data
    };
  },
  inputChanged: function (data) {
    return {
      actionType: "INPUT_CHANGED",
      data: data
    };
  },
  ingredientDeleted: function (data) {
    return {
      actionType: "INGREDIENT_DELETED",
      data: data
    };
  },
  ingredientCreated: function (data) {
    return {
      actionType: "INGREDIENT_CREATED",
      data: data
    };
  }
});

module.exports = RecipeActions;
