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

    return (/*jshint ignore:start*/
      <RadiumInput
        {...this.props}
        value={value}
        ref="input"
        onChange={this.handleChange}
        />
    /*jshint ignore:end*/);
  }
});

module.exports = IngredientFormInput;
