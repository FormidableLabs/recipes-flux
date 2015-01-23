var React = require("react");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var Color = require("color");

var Button = React.createClass({
  mixins: [RadiumBrowserState],

  styles: {
    default: {
      fontSize: 16,
      backgroundColor: "#0074d9",
      backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))",
      color: "#fff",
      borderRadius: "0.3em",
      padding: "0.5em 1em",
      cursor: "pointer",
      $dynamicBorder: true,
      $dynamicBoxShadow: true,
      $dynamicBackground: true
    },
    modifiers: {
      display: {
        block: {
          display: "block",
          width: "100%"
        }
      },
      size: {
        large: {
          fontSize: 21
        },
        small: {
          fontSize: 14
        },
        mini: {
          fontSize: 12,
          padding: "0.4em 0.6em 0.35em",
          lineHeight: 1
        }
      },
      color: {
        green: {
          backgroundColor: "#3d9970"
        },
        orange: {
          backgroundColor: "#FF851B"
        },
        purple: {
          backgroundColor: "#b10dc9"
        },
        white: {
          backgroundColor: "#fff",
          color: "#0074d9",
          border: "1px solid #aec5d9",
          borderBottomColor: "#fff",
          boxShadow: "0 2px 0 #aec5d9",
          $dynamicBorder: false,
          $dynamicBoxShadow: false,
          $dynamicBackground: false,
          states: {
            hover: {
              backgroundColor: "#aec5d9",
              boxShadow: "0 2px 0 #8FA2B2",
              borderBottomColor: "#aec5d9"
            },
            active: {
              color: "#005299",
              boxShadow: "none",
              backgroundColor: "#8FA2B2",
              borderBottomColor: "#8FA2B2"
            },
            focus: {
              backgroundColor: "#aec5d9",
              boxShadow: "0 2px 0 #8FA2B2",
              borderBottomColor: "#aec5d9"
            }
          }
        }
      }
    },
    states: {
      hover: {
        $hoverBackgroundColor: true
      },
      active: {
        $activeBackgroundColor: true,
        transform: "translateY(2px)",
        $dynamicBoxShadow: false
      },
      focus: {
        $focusBackgroundColor: true
      }
    }
  },

  buildComputedStyles: function (baseStyles) {
    var computedStyles = {};
    var backgroundColor;

    if (baseStyles.$dynamicBackground) {
      if (baseStyles.$hoverBackgroundColor) {
        backgroundColor = Color(baseStyles.backgroundColor)
          .lighten(0.25)
          .hexString();
      }

      if (baseStyles.$activeBackgroundColor) {
        backgroundColor = Color(baseStyles.backgroundColor)
          .darken(0.25)
          .hexString();
      }

      if (baseStyles.$focusBackgroundColor) {
        backgroundColor = Color(baseStyles.backgroundColor)
          .lighten(0.25)
          .hexString();
      }

      if (backgroundColor) {
        computedStyles.backgroundColor = backgroundColor;
      }
    }

    if (baseStyles.$dynamicBorder) {
      computedStyles.border = "1px solid " + baseStyles.backgroundColor;
    }

    if (baseStyles.$dynamicBoxShadow) {
      var boxShadowColor = Color(baseStyles.backgroundColor)
        .darken(0.25)
        .hexString();

      var btnBoxShadow = baseStyles.$dynamicBoxShadow ? "0 2px 0 " + boxShadowColor : null

      computedStyles.boxShadow = btnBoxShadow;
    }

    return computedStyles;
  },

  render: function () {
    var builtStyles = this.getStyles();
    var computedStyles = this.buildComputedStyles(builtStyles);

    return (
      <button
        style={this.getComputedStyles(builtStyles, computedStyles)}
        {...this.radiumBrowserStateEvents}
        {...this.props}
        >
        {this.props.children}
      </button>
    )
  }
});

module.exports = Button;
