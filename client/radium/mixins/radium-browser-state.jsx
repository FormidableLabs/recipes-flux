var _ = require("lodash");

var RadiumBrowserState = {
  getInitialState: function () {
    return {
      hover: false,
      focus: false,
      active: false
    };
  },

  componentWillMount : function () {
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

  getModifierStyles: function () {
    var modifierStyles = {};

    _.forEach(this.styles.modifiers, function (modifier, key) {
      if (this.props[key]) {
        var modifierValue = this.props[key];
        var activeModifier, activeModifierStates;

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

        if (activeModifier.states) {
          activeModifierStates = this.getStateStyles(activeModifier.states);
        }

        _.assign(
          modifierStyles,
          activeModifier,
          activeModifierStates
        );
      }
    }, this);

    return modifierStyles;
  },

  getStyles: function () {
    return _.assign(
      {},
      this.styles.standard,
      this.props.styleOverrides,
      this.getStateStyles(this.styles.states),
      this.getModifierStyles()
    );
  },

  getComputedStyles: function (styles, computedStyles) {
    return _.assign(
      {},
      styles,
      computedStyles
    );
  }
};

module.exports = RadiumBrowserState;
