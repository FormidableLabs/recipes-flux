var React = require('react');

/** 
Router
*/

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Recipe = React.createClass({  
  displayName : 'Recipe',
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  
  render : function() {return(
    <div className="recipe">
      <p> 
        <Link to="RecipeDetails" params={{recipeId: this.props.recipe.id}}> 
          {this.props.recipe.title}
        </Link>
      </p>
      <RouteHandler/>
    </div>
  )}
});

module.exports = Recipe;