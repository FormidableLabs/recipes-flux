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
    },
    modifiers: {
      large: {
        fontSize: 21
      },
      small: {
        fontSize: 14
      }
    },
    states: {
      hover: {
        backgroundColor: "#FF851B"
      },
      active: {
        backgroundColor: "#b10dc9"
      },
      focus: {
        backgroundColor: "#3d9970"
      }
    }
  },

  // TODO: Need good interface for building modifier styles, with understanding
  // that multiple modifiers can be applied at once. Also need to figure out
  // states for modifiers.
  getModifierStyles: function () {
    var modifierStyles;

    if (this.props.size) {
      modifierStyles = this.styles.modifiers[this.props.size];
    }

    return modifierStyles;
  },

  buildComputedStyles: function (baseStyles) {
    var boxShadowColor = Color(baseStyles.backgroundColor)
      .darken(0.25)
      .hexString();

    var computedStyles = {
      boxShadow: "0 2px 0 " + boxShadowColor
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
