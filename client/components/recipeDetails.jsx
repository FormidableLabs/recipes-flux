/**
React
*/

var React = require('react');

/**
Router & Data
*/

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
// RecipeStore = require('recipe').RecipeStore
var db = require('../mock_db');
var _ = require('lodash');

/**
Child Components
*/

var Ingredient = require('./ingredient');

/**
Component
*/

var RecipeDetails = React.createClass({
  displayName : 'RecipeDetails',
  propTypes: {},
  mixins : [],
  getInitialState : function() {

    /**
    We'll build an API here to fetch the data, passing in
    the id. This will look like:

    request.get()
    this.state = {data: data}

    */
    function getRecipeFromDb (id) {
      return _.find(db, {id: id})
    }
    console.log(this.props.params.recipeId)
    recipe = getRecipeFromDb(this.props.params.recipeId)
    console.log(recipe)
    return {recipe : recipe}
  },
  componentWillMount : function() {
    /**
    Process instructions to split string on newline
    */

    var str = this.state.recipe.instructions;
    var html = "<p>" + str.replace(/\n([ \t]*\n)+/g, '</p><p>').replace(/\n/g, '</p><p>') + "</p>";
    this.state.parsedInstructions = html;

    /**
    Make servings a controlled input and
    http://facebook.github.io/react/docs/forms.html#controlled-components
    */

  },
  componentWillUnmount : function() {},
  render : function() {
    var ingredientNodes = recipe.ingredients.map(function(ingredient){
    return (
        <Ingredient ingredient={ingredient}/>
      )
    })
    return(
    <div className="Recipe">
      <p className="Recipe-title">{this.state.recipe.title}</p>
      <p> Serves: {this.state.recipe.portions} (change)</p>
      <div className="row">
        <div className="col-lg-4">
          {ingredientNodes}
        </div>
        <div
          className="Recipe-instructions col-lg-4"
          dangerouslySetInnerHTML={{__html: this.state.parsedInstructions}}
        />
      </div>
      <RouteHandler {...this.props}/>
    </div>
  )}
});

module.exports = RecipeDetails;


/**
Ingredient

  render : function() {

    return (
    <div className="Recipes">
      <p> Recipe Bank: </p>
      {recipeNodes}
      <RouteHandler {...this.props}/>
    </div>
  )}
*/