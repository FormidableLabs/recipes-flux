// Dependencies
var _ = require("lodash");

// Component
var RadiumBrowserState = {
  getInitialState: function () {
    return {
      hover: false,
      focus: false,
      active: false
    };
  },

  componentWillMount: function () {
    this.radiumBrowserStateEvents = {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    };
  },

  callRadiumHandler: function (handler, ev) {
    var currentHandler = this.props[handler];

    if (currentHandler) {
      currentHandler(ev);
    }
  },

  handleMouseEnter: function (ev) {
    this.callRadiumHandler("onMouseEnter", ev);

    this.setState({
      hover: true
    });
  },

  handleMouseLeave: function (ev) {
    this.callRadiumHandler("onMouseLeave", ev);

    this.setState({
      hover: false,
      active: false
    });
  },

  handleMouseDown: function (ev) {
    this.callRadiumHandler("onMouseDown", ev);

    this.setState({
      active: true
    });
  },

  handleMouseUp: function (ev) {
    this.callRadiumHandler("onMouseUp", ev);

    this.setState({
      active: false
    });
  },

  handleFocus: function (ev) {
    this.callRadiumHandler("onFocus", ev);

    this.setState({
      focus: true
    });
  },

  handleBlur: function (ev) {
    this.callRadiumHandler("onBlur", ev);

    this.setState({
      focus: false
    });
  },

  // TODO: Handle multiple active states. It's an "or" thing right now.
  getStateStyles: function (states) {
    var stateStyles;

    if (this.state.active) {
      stateStyles = states.active;
    } else if (this.state.focus) {
      stateStyles = states.focus;
    } else if (this.state.hover) {
      stateStyles = states.hover;
    }

    return stateStyles;
  },

  getModifierStyles: function (styles) {
    var modifierStyles = styles.standard;

    // TODO: Replace with reduce?
    _.forEach(styles.modifiers, function (modifier, key) {
      if (this.props[key]) {
        var modifierValue = this.props[key];
        var activeModifier;

        if (_.isString(modifierValue)) {
          activeModifier = modifier[modifierValue];
        } else if (_.isBoolean(modifierValue)) {
          activeModifier = modifier;
        } else {
          return;
        }

        if (!activeModifier) {
          return;
        }

        _.merge(
          modifierStyles,
          activeModifier
        );
      }
    }, this);

    return modifierStyles;
  },

  getStaticStyles: function (styles) {
    var elementStyles = this.getModifierStyles(styles);

    return _.merge(
      elementStyles,
      this.props.styleOverrides,
      this.getStateStyles(elementStyles.states)
    );
  },

  buildStyles: function (styles, computedStyleFunc) {
    var staticStyles = this.getStaticStyles(styles);
    var computedStyles;

    if (computedStyleFunc) {
      computedStyles = computedStyleFunc(staticStyles);
    }

    return _.merge(staticStyles, computedStyles);
  }
};

module.exports = RadiumBrowserState;
