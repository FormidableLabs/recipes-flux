var React = require('react');
var Recipe = require('./recipe')

/** 
Router & Data
*/

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var db = require('../mock_db')

/**
Component
*/

var Recipes = React.createClass({
  displayName : 'Recipes',
  propTypes: {},
  mixins : [],
  /**
  Get initial state grabs our fake data...
  */
  getInitialState : function() { return {db: db} },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  render : function() {
    var recipeNodes = this.state.db.map(function(recipe){
    return (
        <Recipe recipe={recipe} key={recipe.id}>
        </Recipe>
      )
    })
    return (
    <div className="Recipes">
      <p className="Recipes-title"> Recipe Bank: </p>
      {recipeNodes}
      <RouteHandler {...this.props}/>
    </div>
  )}
});

module.exports = Recipes;