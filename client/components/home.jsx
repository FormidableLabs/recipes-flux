/*jshint unused:false */
var React = require("react");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

var RadiumButton = require("../radium/components/button");
var RadiumButtonGroup = require("../radium/components/button-group");

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

    var customBtn = {
      borderRadius: 0
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
            <RadiumButton color="red">
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
            <RadiumButton color="black">
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
            <RadiumButton display="block" size="mini" color="white">
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton display="block" size="small" color="green">
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton display="block">
              Cool Button
            </RadiumButton>
          </p>

          <p>
            <RadiumButton display="block" size="large" color="black">
              Cool Button
            </RadiumButton>
          </p>
        </div>

        <div style={paddedCellStyle}>
          <p>
            <RadiumButtonGroup>
              <RadiumButton color="white" size="mini">One</RadiumButton>
              <RadiumButton color="white" size="mini">Two</RadiumButton>
              <RadiumButton color="white" size="mini">Three</RadiumButton>
            </RadiumButtonGroup>
          </p>

          <p>
            <RadiumButtonGroup>
              <RadiumButton color="green" size="small">One</RadiumButton>
              <RadiumButton color="green" size="small">Two</RadiumButton>
              <RadiumButton color="green" size="small">Three</RadiumButton>
            </RadiumButtonGroup>
          </p>

          <p>
            <RadiumButtonGroup>
              <RadiumButton>One</RadiumButton>
              <RadiumButton>Two</RadiumButton>
              <RadiumButton>Three</RadiumButton>
            </RadiumButtonGroup>
          </p>

          <p>
            <RadiumButtonGroup>
              <RadiumButton color="black" size="large">One</RadiumButton>
              <RadiumButton color="black" size="large">Two</RadiumButton>
              <RadiumButton color="black" size="large">Three</RadiumButton>
            </RadiumButtonGroup>
          </p>
        </div>

        <RouteHandler/>
      </div>
    /*jshint ignore:end */);
  }
});

module.exports = Home;
