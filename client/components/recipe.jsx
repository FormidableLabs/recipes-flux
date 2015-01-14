var React = require("react");

/** 
Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Recipe = React.createClass({  
  displayName : "Recipe",
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null; },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  
  render : function() {return(
    /*jshint ignore:start unused:false */
    <div className="recipe">
      <p> 
        <Link to="RecipeDetails" params={{recipeId: this.props.recipe._id}}> 
          {this.props.recipe.title}
        </Link>
        <Link to="edit" params={{recipeId: this.props.recipe._id}}> 
          Edit
        </Link>
      </p>
      <RouteHandler/>
    </div>
  /*jshint ignore:end */);
  }
});

module.exports = Recipe;