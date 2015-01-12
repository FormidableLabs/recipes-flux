var React = require("react");
var Reflux = require("reflux");
var RecipeStore = require("../stores");
var RecipeActions = require("../actions");
var IngredientForm = require("./add-ingredient")

/** 
Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Recipe = React.createClass({  
  displayName : "Add",
  propTypes: {},
  mixins : [Reflux.connect(RecipeStore,"recipeAdded")],
  getInitialState : function() { 
    return {
      titleInput: "",
      portionsInput: "",
      totalTimeInMinutesInput: "",
      instructionsInput: ""
    }
  },
  componentWillMount : function() {
    RecipeStore.listen(function(data) {
        console.log("...data received by the component, the store sends: ", data);
    });

    /**
    * This is where we would do an ajax success alert for the user -- Alex
    */

  },
  componentWillUnmount : function() {},
  handleInputChange: function (event) {
    /** 
    * Some sleight of hand and I wonder if there is a better way
    * this works because the id and state have the same name.
    * So the logic is: 
    * 1. InitalState makes the inputs ""
    * 2. Change happens on input which triggers
    * handleInputChange callback 
    * 3. To figure out which input we're changing, 
    * we grab the id and here's the magic - 
    * the id is set to the same name as state.
    * Should be possible to reference ref from event?
    * ------- We go through this complication to validate inputs ----------
    * http://facebook.github.io/react/docs/forms.html#controlled-components
    */

    /** 
    * Next thought is that maybe these should be sub components...
    * But then we have to use this.refs to get the data out of the child
    * Why didn't that work? 
    */
    
    var newValue = event.target.id;

    var isNumInput = event.target.id === "portionsInput" || "totalTimeInMinutesInput";
    /**
    * for some reason, event.target.value is always a string. Why?
    */
    var isNotNum = typeof(event.target.value) !== "number";

    if (isNumInput && isNotNum) {
      /**
      * Alex -- Validate
      */ 
    }

    this.setState({ newValue : event.target.value});

    // check to see if integers - make something visible if not

  },
  addClicked: function () {
    RecipeActions.recipeAdded({
      id: Math.floor(Math.random() * 1000000),
      title: this.refs.titleInput.getDOMNode().value, 
      portions: this.refs.portionsInput.getDOMNode().value,
      totalTimeInMinutes: this.refs.totalTimeInMinutesInput.getDOMNode().value,
      ingredients: [],
      instructions: this.refs.instructionsInput.getDOMNode().value
    })

    this.setState({
      title: "",
      portions: "",
      totalTimeInMinutes: "",
      ingredients: [],
      instructions: ""
    });

  },
  render : function() {
    return(
    <div className="recipe">
      <p> Time to add a new recipe :) </p>
      <input 
        type="text"
        ref="titleInput"
        id="titleInput"
        value={this.state.titleValue}
        placeholder="Title"
        onChange={this.handleInputChange} />
      <input 
        type="text"
        ref="portionsInput" 
        id="portionsInput"
        value={this.state.portionsValue} 
        placeholder="Portions"
        onChange={this.handleInputChange} />
      <input 
        type="text"
        ref="totalTimeInMinutesInput" 
        id="totalTimeInMinutesInput"
        value={this.state.totalTimeInMinutesValue} 
        placeholder="Total time in minutes"
        onChange={this.handleInputChange} />
      <input 
        type="text"
        ref="instructionsInput" 
        id="instructionsInput"
        value={this.state.instructionsValue} 
        placeholder="Instructions"
        onChange={this.handleInputChange} />
      <button onClick={this.addClicked}>Submit Recipe</button>
      <RouteHandler/>
    </div>
  )}
});

module.exports = Recipe;