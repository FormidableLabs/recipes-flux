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

/**
* Note {...this.props}, see:
* 
* http://facebook.github.io/react/docs/jsx-spread.html
* https://github.com/rackt/react-router/
* blob/master/docs/guides/overview.md#dynamic-segments
*/

module.exports = App;