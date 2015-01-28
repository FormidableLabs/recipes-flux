/*jshint unused:false */
var React = require("react");
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

var Input = require("./input");
var RadiumButton = require("../radium/components/button");
var RadiumInput = require("../radium/components/input");
var IngredientForm = require("./ingredient-form");
var Grid = require("../radium/components/grid");
var GridCell = require("../radium/components/grid-cell");
var IngredientFormInput = require("./ingredient-form-input");

/**
Component
*/

function getState(id){
  return RecipeStore.getRecipe(id);
}

var RecipeForm = React.createClass({
  displayName : "RecipeForm",
  propTypes: {},
  mixins : [RecipeStore.mixin],
  getInitialState : function() {
    if (this.props.params._id) {
      /**
      * User came in from the edit button of an existing recipe,
      * so let's use the params to figure out which recipe
      * so that we can populate the forms
      */
      this._id = this.props.params._id;
      return RecipeStore.getRecipe(this.props.params._id);

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
        ingredients: [
          {
            ingredient: "Brown Rice",
            quantity: 2.5,
            measurement: "cups",
            modifier: "cooked"
          },
          {
            ingredient: "",
            quantity: "",
            measurement: "",
            modifier: ""
          }
        ],
        saved: false
      };

      RecipeActions.recipeCreated(newRecipe);
      this._id = newRecipe._id;
      return newRecipe;
    }
  },

  componentWillMount : function() {},

  componentWillUnmount : function() {},

  inputCallback: function (_id, accessor, index, value) {
    RecipeActions.inputChanged({
      _id: _id,
      accessor: accessor,
      index: index,
      value: value
    });
  },

  onChange: function(){
    this.setState(getState(this._id));
  },

  ingredientCreated : function () {
    RecipeActions.ingredientCreated({
      _id: this.state._id
    });
  },

  createNodes : function (ingredient, index) {
    return (/*jshint ignore:start*/
      <IngredientForm
        key={index}
        index={index}
        ingredient={ingredient}
        _id={this.state._id}
        />
    /*jshint ignore:end */);
  },

  render: function () {
    var ingredientFormNodes = this.state.ingredients.map(
      this.createNodes
    );

    return(/*jshint ignore:start */
      <div className="recipe">
        <Grid
          gutters={true}
          >
          <GridCell
            width={4/5}
            styleOverrides={{
              paddingTop: "0.5em",
              paddingBottom: "0.5em"
            }}
            >
            <IngredientFormInput
              _id={this.state._id}
              accessor="title"
              label="Title"
              placeholder="Title"
              value={this.state.title}
              size="large"
              />
          </GridCell>
        </Grid>

        <Grid gutters={true}>
          <GridCell
            width={1/5}
            styleOverrides={{
              paddingTop: "0.5em",
              paddingBottom: "0.5em"
            }}
            >
            <IngredientFormInput
              _id={this.state._id}
              accessor="portions"
              label="Portions"
              placeholder="Portions"
              value={this.state.portions}
              />
          </GridCell>

          <GridCell
            width={1/5}
            styleOverrides={{
              paddingTop: "0.5em",
              paddingBottom: "0.5em"
            }}
            >
            <IngredientFormInput
              _id={this.state._id}
              accessor="totalTimeInMinutes"
              label="Total time in minutes"
              placeholder="Total time in minutes"
              value={this.state.totalTimeInMinutes}
              />
          </GridCell>
        </Grid>

        <Grid gutters={true}>
          <GridCell
            styleOverrides={{
              paddingTop: "0.5em",
              paddingBottom: "0.5em"
            }}
            width={4/5}
            >
            <IngredientFormInput
              _id={this.state._id}
              type="textarea"
              textareaResize={true}
              accessor="instructions"
              label="Instructions"
              placeholder="Instructions"
              value={this.state.instructions}
              />
          </GridCell>
        </Grid>

        {ingredientFormNodes}

        <RadiumButton
          styleOverrides={{
            marginTop: "0.5em"
          }}
          onClick={this.ingredientCreated}
          >
          Add Another Ingredient
        </RadiumButton>

        <RouteHandler {...this.props}/>
      </div>
    /*jshint ignore:end */);
  }
});

module.exports = RecipeForm;
