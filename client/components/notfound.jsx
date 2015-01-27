/* jshint unused:false */
var React = require("react");

var NotFound = React.createClass({
  displayName: "404",
  propTypes: {},
  mixins: [],
  getInitialState: function () { return null; },
  componentWillMount: function () {},
  componentWillUnmount: function () {},
  render: function () {return (
    /* jshint ignore:start */
  	<p>
  		Page not found
  	</p>
  /* jshint ignore:end */);
}
});

module.exports = NotFound;