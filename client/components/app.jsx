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

var Nav = require('./nav')

/**
Component
*/

var App = React.createClass({
  displayName : 'App',
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  render : function() { return (
    /*jshint ignore:start unused:false*/
    <div className="epicureContainer">
      <Nav/>
      <RouteHandler {...this.props}/>
    </div>
		/*jshint ignore:end */)
  }
});

module.exports = App;