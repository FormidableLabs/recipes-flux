/*jshint unused:false */
var React = require("react");

var RecipeActions = require("../actions");

/**
Child Components
*/

var Input = require("./input");
var Button = require("./button");
var RadiumButton = require("../radium/components/button");
var RadiumInput = require("../radium/components/input");

var IngredientFormInput = React.createClass({
  handleChange: function () {
    RecipeActions.inputChanged({
      _id: this.props._id,
      accessor: this.props.accessor,
      index: this.props.index,
      value: this.refs.input.getInputElement().value
    });
  },

  render: function () {
    return (
      <RadiumInput
        {...this.props}
        size={this.props.size}
        label={this.props.label}
        labelHidden={true}
        placeholder={this.props.label}
        value={this.props.value}
        ref="input"
        onChange={this.handleChange}
        />
    );
  }
});

module.exports = IngredientFormInput;
