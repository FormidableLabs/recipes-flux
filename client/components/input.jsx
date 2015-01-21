/*jshint unused:false */
var React = require("react");

/** 
Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Input = React.createClass({  
  displayName : "Input",
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null;},
  componentWillMount : function() {},
  handleInputChange : function () {
    /* proxy to parent moving to generalize input */
    this.props.inputCallback(
      this.props._id,
      this.props.accessor,
      this.props.index,
      this.refs.inputValue.getDOMNode().value
    );
  },
  componentWillUnmount : function() {},
  render : function() {
    return(
      /*jshint ignore:start*/
      <input 
        _id={this.props._id}
        type="text"
        ref="inputValue"
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.handleInputChange} />
      /*jshint ignore:end */);
  }
});

module.exports = Input;