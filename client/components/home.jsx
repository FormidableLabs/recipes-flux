/*jshint unused:false */
var React = require("react");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

var RadiumButton = require("../radium/components/button");

var Home = React.createClass({
  displayName : "Home",
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null; },
  componentWillMount : function() {},
  componentWillUnmount : function() {},

  handleBtnHover: function (component, ev) {
    console.log("Hovered over", component, ev);
  },

  render : function() {
    var paddedCellStyle = {
      padding: "1em 0"
    };

    return (/*jshint ignore:start*/
      <div>
        <p>
          home rendered
        </p>

        <div style={paddedCellStyle}>
          <p>
            <RadiumButton onRadiumMouseEnter={this.handleBtnHover}>
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton color="green">
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton color="purple">
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton color="orange">
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton color="white">
              Cool Button
            </RadiumButton>
          </p>
        </div>

        <div style={paddedCellStyle}>
          <p>
            <RadiumButton size="mini">
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton size="small">
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton>
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton size="large">
              Cool Button
            </RadiumButton>
          </p>
        </div>

        <div style={paddedCellStyle}>
          <p>
            <RadiumButton display="block">
              Cool Button
            </RadiumButton>
          </p>
        </div>

        <RouteHandler/>
      </div>
    /*jshint ignore:end */);
  }
});

module.exports = Home;
