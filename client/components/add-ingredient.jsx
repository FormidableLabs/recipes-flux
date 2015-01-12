var React = require("react");
var Reflux = require("reflux");
var RecipeStore = require("../stores");
var RecipeActions = require("../actions");

/** 
Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Recipe = React.createClass({  
  displayName : "AddIngredient",
  propTypes: {},
  mixins : [Reflux.connect(RecipeStore,"recipeAdded")],
  getInitialState : function() { 
    return {
      ingredient: "Ingredient",
      quantity: "Quantity",
      measurement: "Measurement Units",
      modifier: "Modifier (e.g. 'chopped')"
    }
  },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  render : function() {
    return(
    <div className="recipe">
      <input 
        type="text" 
        placeholder={this.state.ingredient} 
        onChange={this.handleInputChange} 
        ref="ingredientInput"/>
      <input 
        type="text" 
        placeholder={this.state.quantity} 
        onChange={this.handleInputChange} 
        ref="quantityInput"/>
      <input 
        type="text" 
        placeholder={this.state.measurement} 
        onChange={this.handleInputChange} 
        ref="measurementInput"/>
      <input 
        type="text" 
        placeholder={this.state.modifier} 
        onChange={this.handleInputChange} 
        ref="modifierInput"/>
    </div>
  )}
});

module.exports = Recipe;