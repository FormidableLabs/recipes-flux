// React
var React = require("react");
var RecipeActions = require("../actions/recipe-actions");

// Child Components
var Button = require("./button");
var IngredientFormInput = require("./ingredient-form-input");

// Component
var IngredientForm = React.createClass({
  deleteIngredient: function () {
    RecipeActions.ingredientDeleted({
      _id: this.props._id,
      index: this.props.index
    });
  },

  buildField: function (field, index) {
    return (
      <IngredientFormInput
        key={index}
        _id={this.props._id}
        index={this.props.index}
        accessor={field.accessor}
        label={field.name}
        placeholder={field.name}
        value={this.props.ingredient[field.accessor]} />
    );
  },

  render: function () {
    var ingredientFields = [
      {
        name: "Ingredient",
        accessor: "ingredient"
      },
      {
        name: "Quantity",
        accessor: "quantity"
      },
      {
        name: "Measurement",
        accessor: "measurement"
      },
      {
        name: "Modifier",
        accessor: "modifier"
      }
    ];

    var ingredients = ingredientFields.map(this.buildField);
    var button = (
      <Button
        key={"button"}
        buttonCallback={this.deleteIngredient}
        value="Delete" />
    );

    ingredients.push(button);

    return (
      <div>
        {ingredients}
      </div>
    );
  }
});

module.exports = IngredientForm;
