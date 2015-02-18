// React
var React = require("react");
var RecipeActions = require("../actions");

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

  handleChange: function () {
    var newValue = this.refs.input.getDOMNode().value;

    RecipeActions.inputChanged({
      _id: this.props._id,
      accessor: this.props.accessor,
      index: this.props.index,
      value: newValue
    });

    this.setState({
      value: newValue
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
