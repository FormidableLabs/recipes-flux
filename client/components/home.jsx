/*jshint unused:false */
var React = require("react");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

var RadiumButton = require("./radium/button");
var RadiumButtonAlt = require("./radium/button-alt-events");

var Home = React.createClass({
  displayName : "Home",
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null; },
  componentWillMount : function() {},
  componentWillUnmount : function() {},

  handleBtnHover: function (button) {
    console.log("Hovered over", button);
  },

  render : function() {return(
    /*jshint ignore:start*/
    <div>
      <p>
        home rendered
      </p>

      <p>
        <RadiumButton
          onRadiumMouseEnter={this.handleBtnHover}
          >
          Cool Button
        </RadiumButton>
      </p>

      <p>
        <RadiumButtonAlt
          onMouseEnter={this.handleBtnHover}
          >
          Another Button
        </RadiumButtonAlt>
      </p>

      <RouteHandler/>
    </div>
  /*jshint ignore:end */);
  }
});

module.exports = Home;
