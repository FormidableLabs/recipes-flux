/* jshint unused:false */
var React = require("react");

/**
 * Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Input = React.createClass({
  displayName: "Input",
  propTypes: {},
  mixins: [],
  getInitialState: function () { return null;},
  componentWillMount: function () {},
  handleButtonClick: function () {
    /* Proxy to parent moving to generalize input */
    this.props.buttonCallback(
      this.props._id,
      this.props.accessor,
      this.props.index
    );
  },
  componentWillUnmount: function () {},
  render: function () {
    return (
      /* jshint ignore:start */
      <button
        _id={this.props._id}
        type="button"
        ref="theButton"
        onClick={this.handleButtonClick}
        > {this.props.value} </button>
      /* jshint ignore:end */);
  }
});

module.exports = Input;