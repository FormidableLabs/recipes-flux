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
 * Component
 */

var Home = React.createClass({
  displayName: "Home",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div>
        <p>
          home rendered
        </p>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Home;
