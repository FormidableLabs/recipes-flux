// React
var React = require("react");
var RecipeActions = require("../actions/recipe-actions");

// Child Components
var Input = require("./input");

// Component
var IngredientFormInput = React.createClass({
  getInitialState: function () {
    return {
      value: null
    };
  },

  getDefaultProps: function () {
    return {
      labelHidden: true
    };
  },

  handleChange: function (data) {
    RecipeActions.inputChanged(data);

    this.setState({
      value: data.value
    });
  },

  render: function () {
    var value = this.state.value || this.props.value;

    return (
      <Input
        {...this.props}
        value={value}
        ref="input"
        inputCallback={this.handleChange} />
    );
  }
});

module.exports = IngredientFormInput;
