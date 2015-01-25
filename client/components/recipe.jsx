/*jshint unused:false */
var React = require("react");
var RecipeStore = require("../stores");
var RecipeActions = require("../actions");

/**
Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

/**
Child Components
*/

var Button = require("./button");

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
  render: function () {return (
    /* jshint ignore:start */
    <div className="recipe">
      <p>
        <Link to="RecipeDetails" params={{_id: this.props.recipe._id}}>
          {this.props.recipe.title}
        </Link>
        &nbsp;
        <Link to="edit" params={{_id: this.props.recipe._id}}>
          *Edit*
        </Link>
        <Button
          _id={this.props.recipe._id}
          buttonCallback={this.deleteRecipe}
          value="Delete"/>
      </p>
      <RouteHandler/>
    </div>
  /* jshint ignore:end */);
  }
});

module.exports = Recipe;