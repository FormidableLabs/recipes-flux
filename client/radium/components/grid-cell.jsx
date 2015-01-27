/*jshint unused:false */
var React = require("react");
var _ = require("lodash");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var GridCell = React.createClass({
  mixins: [RadiumBrowserState],

  styles: {
    standard: {
      boxSizing: "border-box",
      display: "inline-block",
      textAlign: "left",
      verticalAlign: "top",
      width: "100%"
    },
    modifiers: {
      gutter: {
        padding: "0 0.5em"
      }
    }
  },

  propTypes: {
    gutter: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function () {
    return {
      gutter: false
    };
  },

  render: function () {
    var builtStyles = _.assign({}, this.getStyles(), {
      width: (this.props.width * 100) + "%"
    });

    return (/*jshint ignore:start*/
      <div style={builtStyles}>
        {this.props.children}
      </div>
    /*jshint ignore:end*/);
  }
});

module.exports = GridCell;
