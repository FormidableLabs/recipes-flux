/*jshint unused:false */
var React = require("react");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

var RadiumGrid = require("../radium/components/grid");
var RadiumGridCell = require("../radium/components/grid-cell");
var RadiumButton = require("../radium/components/button");
var RadiumButtonGroup = require("../radium/components/button-group");
var RadiumInput = require("../radium/components/input");

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

    var darkBg = {
      margin: 0,
      background: "#333",
      color: "#fff",
      borderRadius: 5,
      padding: 10
    };

    var medBg = {
      margin: 0,
      background: "#ccc",
      borderRadius: 5,
      padding: 10
    }

    return (/*jshint ignore:start*/
      <div>
        <p>
          home rendered
        </p>

        <RadiumGrid gutters="true">
          <RadiumGridCell
            width={1/3}
            styleOverrides={{
              textAlign: "right",
              marginBottom: "1em"
            }}>
            <h1 style={darkBg}>Test</h1>
          </RadiumGridCell>
          <RadiumGridCell width={2/3}>
            <p style={medBg}>Here's some content!</p>
          </RadiumGridCell>
          <RadiumGridCell width={1/4}>
            <p style={medBg}>Here's some content!</p>
          </RadiumGridCell>
          <RadiumGridCell width={1/4}>
            <p style={medBg}>Here's some content!</p>
          </RadiumGridCell>
          <RadiumGridCell width={1/4}>
            <p style={medBg}>Here's some content!</p>
          </RadiumGridCell>
          <RadiumGridCell width={1/4}>
            <p style={medBg}>Here's some content!</p>
          </RadiumGridCell>
        </RadiumGrid>

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

        <div style={paddedCellStyle}>
          <p>
            <RadiumInput
              label="Your name"
              placeholder="A text input!" />
          </p>

          <p>
            <RadiumInput
              label="Review"
              labelHidden={true}
              type="textarea"
              placeholder="A textarea!" />
          </p>
        </div>

        <RouteHandler/>
      </div>
    /*jshint ignore:end */);
  }
});

module.exports = Home;
