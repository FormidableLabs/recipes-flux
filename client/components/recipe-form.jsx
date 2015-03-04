// React
var React = require("react");
var RecipeStore = require("../stores/recipe-store");
var RecipeActions = require("../actions/recipe-actions");
var uuid = require("uuid");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Child Components
var Button = require("./button");
var IngredientForm = require("./ingredient-form");
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

  storeDidChange: function () {
    RecipeActions.syncRecipe(this.state)
    this.setState(getState(this.state._id));
  },

  ingredientCreated: function () {
    RecipeActions.ingredientCreated({
      _id: this.state._id
    });
  },

  createNodes: function (ingredient, index) {
    return (
      <IngredientForm
        key={index}
        index={index}
        ingredient={ingredient}
        _id={this.state._id} />
    );
  },

  render: function () {
    var ingredientFormNodes = this.state.ingredients.map(
      this.createNodes
    );

    return (
      <div className="recipe">
        <IngredientFormInput
          _id={this.state._id}
          accessor="title"
          label="Title"
          placeholder="Title"
          value={this.state.title}
          size="large" />
        <IngredientFormInput
          _id={this.state._id}
          labelHidden={false}
          accessor="portions"
          label="Portions"
          placeholder="Portions"
          value={this.state.portions} />
        <IngredientFormInput
          _id={this.state._id}
          labelHidden={false}
          accessor="totalTimeInMinutes"
          label="Total time in minutes"
          placeholder="Total time in minutes"
          value={this.state.totalTimeInMinutes} />
        <IngredientFormInput
          _id={this.state._id}
          type="textarea"
          textareaResize={true}
          accessor="instructions"
          label="Instructions"
          placeholder="Instructions"
          value={this.state.instructions} />

          {ingredientFormNodes}

        <Button
          buttonCallback={this.ingredientCreated}
          value="Add Another Ingredient" />

        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = RecipeForm;
