/**
 * React
*/

var React = require("react");

/**
 * Router
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

/**
 * Child Components
*/

var Nav = require("./nav");

/**
 * Component
*/

var App = React.createClass({
  displayName: "App",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="epicureContainer">
        <Nav/>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});

module.exports = App;
