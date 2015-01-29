/*jshint unused:false */
var React = require("react");
var _ = require("lodash");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var GridCell = React.createClass({
  mixins: [RadiumBrowserState],

  getStyles: function() {
    return {
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
    };
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

  computeWidth: function (styles) {
    var width;

    if (_.isNumber(this.props.width)) {
      width = (this.props.width * 100) + "%";
    } else {
      width = this.props.width;
    }

    return {
      width: width
    };
  },

  render: function () {
    var style = this.buildStyles(this.getStyles(), this.computeWidth);

    return (/*jshint ignore:start*/
      <div style={style}>
        {this.props.children}
      </div>
    /*jshint ignore:end*/);
  }
});

module.exports = GridCell;
