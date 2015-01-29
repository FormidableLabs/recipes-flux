// React
var React = require("react");

// Component
var NotFound = React.createClass({
  displayName: "404",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <p>
        Page not found
      </p>
    );
  }
});

module.exports = NotFound;
