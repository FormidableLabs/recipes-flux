var React = require("react");
var Reflux = require("reflux");
var RecipeStore = require("../stores");
var RecipeActions = require("../actions");
var uuid = require("uuid");

/** 
Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

/**
Child Components
*/

var Input = require("./input")

/**
Component
*/

var RecipeForm = React.createClass({  
  displayName : "RecipeForm",
  propTypes: {},
  mixins : [Reflux.ListenerMixin],
  getInitialState : function() {
    if (this.props.params._id) {
      /**
      * User came in from the edit button of an existing recipe,
      * so let's use the params to figure out which recipe
      * so that we can populate the forms 
      */
      return RecipeStore.getRecipe(this.props.params._id)

    } else {
      /** 
      * create the blank recipe in the store to edit 
      * this will create an empty record if they leave, but that's
      * not terrible because they can edit or delete it from the inbox
      */

      var newRecipe = {
        _id: uuid.v4(),
        title: "New Recipe (edit me)",
        portions: "",
        totalTimeInMinutes: "",
        instructions: "",
        ingredients: [],
        saved: false
      };

      RecipeActions.recipeCreated(newRecipe);
      console.log(newRecipe)
      return newRecipe;
    }

  },
  componentWillMount : function() {
    this.listenTo(RecipeStore, this.onInputUpdate)
  },
  componentWillUnmount : function() {},
  inputCallback: function (_id, accessor, index, value) {
    RecipeActions.inputChanged({
      _id: _id,
      accessor: accessor,
      index: index,
      value: value
    });
  },
  onInputUpdate: function(storeData) {
    this.setState(storeData.data);
  },
  createNodes : function (ingredient, index) {
      return(
      <div className="Ingredient" key={index}>
        <Input 
          placeholder="Ingredient" 
          value={ingredient.ingredient}
          index={index}
          _id={this.state._id}
          inputCallback={this.inputCallback}
          accessor="ingredient"/>
        <Input 
          placeholder="Quantity"
          value={ingredient.quantity}
          index={index}
          _id={this.state._id}
          inputCallback={this.inputCallback}
          accessor="quantity"/>
        <Input 
          placeholder="Measurement Units" 
          value={ingredient.measurement}
          index={index}
          _id={this.state._id}
          inputCallback={this.inputCallback}
          accessor="measurement"/>
        <Input 
          placeholder="Modifier (e.g. 'chopped')" 
          value={ingredient.modifier}
          index={index}
          _id={this.state._id}
          inputCallback={this.inputCallback}
          accessor="modifier"/>
      </div>
      )
  },
  render : function() {
    var ingredientFormNodes = this.state.ingredients.map(
      this.createNodes
      )
    return(
      /*jshint ignore:start*/
    <div className="recipe">
      <p> Time to add a new recipe :) </p>
      <Input 
        placeholder="Title"
        accessor="title" 
        value={this.state.title}
        _id={this.state._id}
        inputCallback={this.inputCallback} />
      <Input 
        placeholder="Portions"
        accessor="portions" 
        value={this.state.portions}
        _id={this.state._id}
        inputCallback={this.inputCallback} />
      <Input 
        placeholder="Total time in minutes"
        accessor="totalTimeInMinutes" 
        value={this.state.totalTimeInMinutes}
        _id={this.state._id}
        inputCallback={this.inputCallback} />
      <Input 
        placeholder="Instructions"
        accessor="instructions" 
        value={this.state.instructions}
        _id={this.state._id}
        inputCallback={this.inputCallback} />
        {ingredientFormNodes}
      <button onClick={this.addClicked}>Submit Recipe</button>
      <RouteHandler {...this.props}/>
    </div>
  /*jshint ignore:end */)}
});

module.exports = RecipeForm;


