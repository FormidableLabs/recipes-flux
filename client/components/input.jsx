var React = require("react");
var Reflux = require("reflux");
var RecipeStore = require("../stores");
var RecipeActions = require("../actions");

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
  componentWillMount : function() {
  },
  handleInputChange : function () {
    RecipeActions.inputChange({ 
      _id: this.props._id,
      value: this.refs.inputValue.getDOMNode().value,
      variableNameInStore: this.props.variableNameInStore /* ugly */
    });
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