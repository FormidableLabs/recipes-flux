/*jshint unused:false */
var React = require("react");
/**
Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

/**
Child Components
*/

var Nav = require("./nav");

/**
Component
*/

var App = React.createClass({
  displayName : "App",
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null; },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  render : function () {
    var style = {
      "maxWidth": 1024,
      "margin": "0 auto",
      "padding": "3em 0"
    }

    return (/*jshint ignore:start */
      <div
        style={style}
        className="epicureContainer">
        <Nav/>
        <RouteHandler {...this.props}/>
      </div>
  	/*jshint ignore:end */);
  }
});

module.exports = App;
