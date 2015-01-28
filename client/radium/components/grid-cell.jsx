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
      width: "100%"
    },
    modifiers: {
      gutter: {
        paddingRight: "0.5em",
        paddingLeft: "0.5em"
      },
      verticalAlign: {
        top: {
          verticalAlign: "top"
        },
        middle: {
          verticalAlign: "middle"
        },
        bottom: {
          verticalAlign: "bottom"
        }
      },
      align: {
        right: {
          textAlign: "right"
        },
        center: {
          textAlign: "center"
        }
      }
    }
  },

  propTypes: {
    gutter: React.PropTypes.bool.isRequired,
    verticalAlign: React.PropTypes.oneOf(["top", "middle", "bottom"])
  },

  getDefaultProps: function () {
    return {
      gutter: false,
      verticalAlign: "top"
    };
  },

  render: function () {
    var width;

    if (_.isNumber(this.props.width)) {
      width = (this.props.width * 100) + "%";
    } else {
      width = this.props.width;
    }

    var builtStyles = _.assign({}, this.getStyles(), {
      width: width
    });

    return (/*jshint ignore:start*/
      <div style={builtStyles}>
        {this.props.children}
      </div>
    /*jshint ignore:end*/);
  }
});

module.exports = GridCell;
