var Reflux = require("reflux");
// var api = require('api')

/**
* Reflux Step 0: create 'actions' 
* to be fired by UI elements and listened to by 'stores'
*/

var RecipeActions = Reflux.createActions([
	"recipeCreated",
	"recipeDeleted",
	"inputChanged",
	"ingredientDeleted",
	"ingredientCreated"
]);

module.exports = RecipeActions;