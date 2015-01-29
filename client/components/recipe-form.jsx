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
var Button = require("./button");

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
          <Button
            buttonCallback={this.ingredientCreated}
            value="Add Another Ingredient" />
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = RecipeForm;
