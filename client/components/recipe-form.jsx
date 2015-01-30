// React
var React = require("react");
var RecipeStore = require("../stores");
var RecipeActions = require("../actions");
var uuid = require("uuid");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Child Components
var Input = require("./input");
var RadiumButton = require("../radium/components/button");
var RadiumInput = require("../radium/components/input");
var IngredientForm = require("./ingredient-form");
var Grid = require("../radium/components/grid");
var GridCell = require("../radium/components/grid-cell");
var IngredientFormInput = require("./ingredient-form-input");

// Component
function getState(id) {
  return RecipeStore.getRecipe(id);
}

var RecipeForm = React.createClass({
  displayName: "RecipeForm",
  propTypes: {},
  mixins: [RecipeStore.mixin],

  getInitialState: function () {
    if (this.props.params._id) {
      // User came in from the edit button of an existing recipe,
      // so let's use the params to figure out which recipe so that we can populate the forms
      this._id = this.props.params.id;
      return RecipeStore.getRecipe(this.props.params._id);
    }

    // Create the blank recipe in the store to edit
    // this will create an empty record if they leave, but that's
    // not terrible because they can edit or delete it from the inbox
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
  },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  inputCallback: function (data) {
    RecipeActions.inputChanged({
      _id: data._id,
      accessor: data.accessor,
      index: data.index,
      value: data.value
    });
  },

  onChange: function () {
    this.setState(getState(this.state._id));
  },

  ingredientCreated: function () {
    RecipeActions.ingredientCreated({
      _id: this.state._id
    });
  },

  ingredientDeleted: function (_id, accessor, index) {
    RecipeActions.ingredientDeleted({
      _id: this.state._id,
      index: index
    });
  },

  createNodes: function (ingredient, index) {
    return (
      <div className="Ingredient" key={index}>
        <Input
          placeholder="Ingredient"
          value={ingredient.ingredient}
          index={index}
          _id={this.state._id}
          inputCallback={this.inputCallback}
          accessor="ingredient" />
        <Input
          placeholder="Quantity"
          value={ingredient.quantity}
          index={index}
          _id={this.state._id}
          inputCallback={this.inputCallback}
          accessor="quantity" />
        <Input
          placeholder="Measurement Units"
          value={ingredient.measurement}
          index={index}
          _id={this.state._id}
          inputCallback={this.inputCallback}
          accessor="measurement" />
        <Input
          placeholder="Modifier (e.g. 'chopped')"
          value={ingredient.modifier}
          index={index}
          _id={this.state._id}
          inputCallback={this.inputCallback}
          accessor="modifier" />
        <Button
          buttonCallback={this.ingredientDeleted}
          index={index}
          value="Delete Ingredient" />
      </div>
    );
  },

  render: function () {
    var ingredientFormNodes = this.state.ingredients.map(
      this.createNodes
    );

    return (
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
              labelHidden={false}
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
              labelHidden={false}
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

        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = RecipeForm;
