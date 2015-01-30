// React
var React = require("react");
var RecipeActions = require("../actions");

// Child Components
var RadiumButton = require("../radium/components/button");
var IngredientFormInput = require("./ingredient-form-input");
var Grid = require("../radium/components/grid");
var GridCell = require("../radium/components/grid-cell");

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
      <GridCell key={index} width={1 / 5}>
        <IngredientFormInput
          _id={this.props._id}
          index={this.props.index}
          accessor={field.accessor}
          label={field.name}
          placeholder={field.name}
          value={this.props.ingredient[field.accessor]}
          />
      </GridCell>
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
      <GridCell key="button" width={1 / 5}>
        <RadiumButton
          size="mini"
          color="white"
          onClick={this.deleteIngredient}>
          Delete
        </RadiumButton>
      </GridCell>
    );

    ingredients.push(button);

    return (
      <Grid
        gutters={true}
        verticalAlign="middle"
        styleOverrides={{
          paddingTop: "0.5em", paddingBottom: "0.5em"
        }}>
        {ingredients}
      </Grid>
    );
  }
});

module.exports = IngredientForm;
