// React
var React = require("react");
var RecipeActions = require("../actions");

// Child Components
var RadiumInput = require("../radium/components/input");

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
    var newValue = this.refs.input.getInputElement().value;

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
      <RadiumInput
        {...this.props}
        value={value}
        ref="input"
        onChange={this.handleChange}
      />
    );
  }
});

module.exports = IngredientFormInput;
