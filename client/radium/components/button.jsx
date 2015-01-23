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
      border: 0,
      borderRadius: 5,
      padding: "0.5em 1em",
      cursor: "pointer",
      outline: "none",
      $hasBoxShadow: true
    },
    modifiers: {
      size: {
        large: {
          fontSize: 21
        },
        small: {
          fontSize: 14
        }
      },
      color: {
        blue: {},
        red: {},
        white: {
          backgroundColor: "#fff",
          color: "#0074d9",
          border: "1px solid #AEC5D9",
          $hasBoxShadow: false
        }
      }
    },
    states: {
      hover: {
        backgroundColor: "#FF851B"
      },
      active: {
        backgroundColor: "#b10dc9",
        transform: "translateY(2px)",
        $hasBoxShadow: false
      },
      focus: {
        backgroundColor: "#3d9970"
      }
    }
  },

  buildComputedStyles: function (baseStyles) {
    var boxShadowColor = Color(baseStyles.backgroundColor)
      .darken(0.25)
      .hexString();

    var btnBoxShadow = baseStyles.$hasBoxShadow ? "0 2px 0 " + boxShadowColor : null

    var computedStyles = {
      boxShadow: btnBoxShadow
    };

    return computedStyles;
  },

  render: function () {
    var builtStyles = this.getStyles(this.getModifierStyles());
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
