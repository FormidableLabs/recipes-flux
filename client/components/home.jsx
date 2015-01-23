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

  render : function() {return(
    /*jshint ignore:start*/
    <div>
      <p>
        home rendered
      </p>

      <p>
        <RadiumButton onRadiumMouseEnter={this.handleBtnHover}>
          Cool Button
        </RadiumButton>
      </p>

      <p>
        <RadiumButton color="white">
          Cool Button
        </RadiumButton>
      </p>

      <p>
        <RadiumButton size="small">
          Cool Button
        </RadiumButton>
      </p>

      <p>
        <RadiumButton size="large">
          Cool Button
        </RadiumButton>
      </p>

      <RouteHandler/>
    </div>
  /*jshint ignore:end */);
  }
});

module.exports = Home;
