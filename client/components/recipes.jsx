var React = require("react");
var Recipe = require("./recipe");
var RecipeStore = require("../stores");

/**
 * Router & Data
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

/**
 * Component
*/

function getState() {
  return {
    store: RecipeStore.getRecipes()
  };
}

var Recipes = React.createClass({
  displayName: "Recipes",
  mixins: [RecipeStore.mixin],

  getInitialState: function () {
    return getState();
  },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  createRecipeNodes: function () {
    var nodes = this.state.store.map(function (recipe) {
      return (
        <Recipe recipe={recipe} key={recipe._id}>
        </Recipe>
      );
    });
    return nodes;
  },

  onChange: function () {
    this.setState(getState());
  },

  render: function () {
    var recipeNodes = this.createRecipeNodes();
    return (
      <div className="Recipes">
        <p className="Recipes-title"> Recipe Bank: </p>
        {recipeNodes}
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});

module.exports = Recipes;
