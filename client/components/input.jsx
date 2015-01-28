var React = require("react");

var Input = React.createClass({
  displayName: "Input",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  handleInputChange: function () {
    /* Proxy to parent moving to generalize input */
    this.props.inputCallback(
      this.props._id,
      this.props.accessor,
      this.props.index,
      this.refs.inputValue.getDOMNode().value
    );
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
