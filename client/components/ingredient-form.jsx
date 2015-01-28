/*jshint unused:false */
var React = require("react");
var _ = require("lodash");

var RecipeActions = require("../actions");

/**
Child Components
*/

var Input = require("./input");
var Button = require("./button");
var RadiumButton = require("../radium/components/button");
var RadiumInput = require("../radium/components/input");
var IngredientFormInput = require("./ingredient-form-input");
var Grid = require("../radium/components/grid");
var GridCell = require("../radium/components/grid-cell");

var IngredientForm = React.createClass({
  deleteIngredient: function () {
    RecipeActions.ingredientDeleted({
      _id: this.props._id,
      index: this.props.index
    });
  },

  buildField: function (field, index) {
    return (/*jshint ignore:start*/
      <GridCell key={index} width={1/5}>
        <IngredientFormInput
          _id={this.props._id}
          index={this.props.index}
          accessor={field.accessor}
          label={field.name}
          placeholder={field.name}
          value={this.props.ingredient[field.accessor]}
          />
      </GridCell>
    /*jshint ignore:end*/);
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
    var button = (/*jshint ignore:start*/
      <GridCell key="button" width={1/5}>
        <RadiumButton
          size="mini"
          color="white"
          onClick={this.deleteIngredient}>
          Delete
        </RadiumButton>
      </GridCell>
    /*jshint ignore:end*/);

    ingredients.push(button);

    return (/*jshint ignore:start*/
      <Grid
        gutters={true}
        verticalAlign="middle"
        styleOverrides={{
          paddingTop: "0.5em", paddingBottom: "0.5em"
        }}>
        {ingredients}
      </Grid>
    /*jshint ignore:end*/);
  }
});

module.exports = IngredientForm;
