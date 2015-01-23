var React = require("react");

var Button = React.createClass({
  styles: {
    default: {
      fontSize: 16,
      background: "#0074d9",
      color: "#fff",
      border: 0,
      borderRadius: 5,
      padding: "0.5em 1em",
      cursor: "pointer"
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
        background: "#4397df"
      },
      active: {
        background: "#1b3c59"
      },
      focus: {
        background: "#3d9970"
      }
    }
  },

  getInitialState: function () {
    return {
      hover: false,
      focus: false,
      active: false
    }
  },

  setStyles: function () {
    var stateStyles, modifierStyles;

    if (this.state.hover) {
      stateStyles = this.styles.states.hover;
    }

    if (this.state.focus) {
      stateStyles = this.styles.states.focus;
    }

    if (this.state.active) {
      stateStyles = this.styles.states.active;
    }

    if (this.props.size) {
      modifierStyles = this.styles.modifiers[this.props.size];
    }

    return _.assign({}, this.styles.default, modifierStyles, stateStyles);
  },

  handleMouseEnter: function (button) {
    var radiumHandler = this.props.onRadiumMouseEnter;

    if (_.isFunction(radiumHandler)) {
      radiumHandler(button);
    }

    this.setState({
      hover: true
    });
  },

  handleMouseLeave: function () {
    this.setState({
      hover: false,
      active: false
    });
  },

  handleMouseDown: function () {
    this.setState({
      active: true
    });
  },

  handleMouseUp: function () {
    this.setState({
      active: false
    });
  },

  handleFocus: function () {
    this.setState({
      focus: true
    });
  },

  handleBlur: function () {
    this.setState({
      focus: false
    });
  },

  render: function () {
    return (
      <button
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        style={this.setStyles()}
        {...this.props}
        >
        {this.props.children}
      </button>
    )
  }
});

module.exports = Button;
