var Biff = require("../biff");

// Request
var request = require("superagent");

var RecipeActions = Biff.createActions({
  recipeCreated: function (data) {
    var self = this;

    request
      .post("/recipes/create")
      .send({ recipe: data })
      .set("Accept", "application/json")
      .end(function () {
        self.dispatch({
          actionType: "RECIPE_CREATE",
          data: data
        });
      });
  },
  recipeDeleted: function (data) {
    var self = this;

    request
      .del("/recipes/delete")
      .send({ _id: data._id })
      .set("Accept", "application/json")
      .end(function () {
        self.dispatch({
          actionType: "RECIPE_DELETE",
          data: data
        });
      });
  },
  syncRecipe: function (data) {
    request
      .put("/recipes/update")
      .send({ recipe: data })
      .set("Accept", "application/json")
      .end(function () {});
  },
  loadRecipes: function (data) {
    this.dispatch({
      actionType: "RECIPES_LOAD",
      data: JSON.parse(data)
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
