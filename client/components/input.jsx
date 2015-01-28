/**
 * React
*/

var React = require("react");

/**
 * Component
*/

var Input = React.createClass({
  displayName: "Input",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  handleInputChange: function () {
    // Proxy to parent moving to generalize input
    this.props.inputCallback({
      _id: this.props._id,
      accessor: this.props.accessor,
      index: this.props.index,
      value: this.refs.inputValue.getDOMNode().value
    });
  },

  componentWillUnmount: function () {},

  render: function () {
    return (
      <input
        _id={this.props._id}
        type="text"
        ref="inputValue"
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.handleInputChange} />
    );
  }
});

module.exports = Input;
