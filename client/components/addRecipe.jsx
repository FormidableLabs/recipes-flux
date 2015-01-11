var React = require('react');
var Reflux = require('reflux');
var RecipeStore = require('../stores');
var RecipeActions = require('../actions');

/** 
Router
*/

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Recipe = React.createClass({  
  displayName : 'Add',
  propTypes: {},
  mixins : [Reflux.connect(RecipeStore,"recipeAdded")],
  getInitialState : function() { return null },
  componentWillMount : function() {

    /**
    Step 4: set the component to listen to the "store" and receive data it sends
    */ 

    RecipeStore.listen(function(data) {
        console.log('...data received by the component, the store sends: ', data);
    });

  },
  componentWillUnmount : function() {},
  addClicked: function () {

    /**
    Reflux Step 2: In the callback, invoke the 'action' method 
    Send relevant data in the 'payload'
    This will use this.fooCollection.itemkey or something when referencing an item in a collection
    */

    RecipeActions.recipeAdded({
      foo: "foo recipe added callback fires to store...", 
      bar: "bar recipe added callback fires to store..."
    })
  },
  render : function() {

    /**
    Reflux Step 1: Regester a callback handler on a UI component.
    */

    /**
    Reflux Step 8: components auto rerender
    */

    return(
    <div className="recipe">
      <p> Time to add a new recipe :) </p>
      <button onClick={this.addClicked}>Add Recipe</button>
      <RouteHandler/>
    </div>
  )}
});

module.exports = Recipe;