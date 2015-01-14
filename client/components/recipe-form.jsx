var React = require("react");
var Reflux = require("reflux");
var RecipeStore = require("../stores");
var RecipeActions = require("../actions");
var IngredientForm = require("./ingredient-form");
var Input = require("./input")
var uuid = require("uuid");

/** 
Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

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
      this.listenTo(
        RecipeStore, this.onInputUpdate, this.initialInputValues
      )

      return this.state;

    } else {
      /** 
      * create the blank recipe in the store to edit 
      * this will create an empty record if they leave, but that's
      * not terrible because they can edit or delete it from the inbox
      */
      this.listenTo(RecipeStore, this.onInputUpdate  )

      var implicitCreate = {
        _id: uuid.v4(),
        title: "",
        portions: "",
        totalTimeInMinutes: "",
        instructions: "",
        ingredients: [],
        saved: false
      }
      return implicitCreate;
    }


  },
  initialInputValues : function (storeData) {
    this.state = _.find(storeData, {_id: this.props.params._id});
    return;
  },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  handleInputChange: function () {},
  onInputUpdate: function(storeData) {
    this.setState(storeData.data[storeData.index]);
  },
  addClicked: function () {
    RecipeActions.recipeAdded({foo: "bar"});

    /* the store is already current, trigger ajax */

    // this.setState({
    //   title: "",
    //   portions: "",
    //   totalTimeInMinutes: "",
    //   ingredients: [],
    //   instructions: ""
    // });

    /**
    * This is where we would do an ajax success alert for the user -- Alex
    */

  },
  render : function() {
    return(
      /*jshint ignore:start*/
    <div className="recipe">
      <p> Time to add a new recipe :) </p>
      <Input 
        _id={this.state._id}
        value={this.state.title}
        placeholder="Title"
        variableNameInStore="title" />
      <Input 
        _id={this.state._id}
        value={this.state.portions}
        placeholder="Portions"
        variableNameInStore="portions" />
      <Input 
        _id={this.state._id}
        value={this.state.totalTimeInMinutes}
        placeholder="Total time in minutes"
        variableNameInStore="totalTimeInMinutes" />
      <Input 
        _id={this.state._id}
        value={this.state.instructions}
        placeholder="Instructions"
        variableNameInStore="instructions" />

      <button onClick={this.addClicked}>Submit Recipe</button>
      <RouteHandler/>
    </div>
  /*jshint ignore:end */)}
});

module.exports = RecipeForm;


