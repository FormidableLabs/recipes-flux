// React
var React = require("react");
var RecipeActions = require("../actions");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// Child Components
var RadiumButton = require("../radium/components/button");

// Component
var Recipe = React.createClass({
  displayName: "Recipe",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  deleteRecipe: function () {
    RecipeActions.recipeDeleted({
      _id: this.props.recipe._id
    });
  },

  render: function () {
    return (
      <div className="recipe">
        <p>
          <Link to="RecipeDetails" params={{_id: this.props.recipe._id}}>
            {this.props.recipe.title}
          </Link>
          &nbsp;
          <Link to="edit" params={{_id: this.props.recipe._id}}>
            *Edit*
          </Link>
          <RadiumButton
            _id={this.props.recipe._id}
            size="mini"
            onClick={this.deleteRecipe}>
            Delete
          </RadiumButton>
        </p>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Recipe;
