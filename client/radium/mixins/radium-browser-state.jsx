var React = require("react");
var _ = require("lodash");

var ReactBrowserState = {
  getInitialState: function () {
    return {
      hover: false,
      focus: false,
      active: false
    }
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

  callRadiumHandler: function (handler, component, ev) {
    var radiumHandlers = {
      "onMouseEnter": "onRadiumMouseEnter",
      "onMouseLeave": "onRadiumMouseLeave",
      "onMouseDown": "onRadiumMouseDown",
      "onMouseUp": "onRadiumMouseUp",
      "onFocus": "onRadiumFocus",
      "onBlur": "onRadiumFocus"
    };

    var currentHandler = this.props[radiumHandlers[handler]];

    if (_.isFunction(currentHandler)) {
      currentHandler(component, ev);
    }
  },

  handleMouseEnter: function (ev) {
    this.callRadiumHandler("onMouseEnter", this, ev);

    this.setState({
      hover: true
    });
  },

  handleMouseLeave: function (ev) {
    this.callRadiumHandler("onMouseLeave", this, ev);

    this.setState({
      hover: false,
      active: false
    });
  },

  handleMouseDown: function (ev) {
    this.callRadiumHandler("onMouseDown", this, ev);

    this.setState({
      active: true
    });
  },

  handleMouseUp: function (ev) {
    this.callRadiumHandler("onMouseUp", this, ev);

    this.setState({
      active: false
    });
  },

  handleFocus: function (ev) {
    this.callRadiumHandler("onFocus", this, ev);

    this.setState({
      focus: true
    });
  },

  handleBlur: function (ev) {
    this.callRadiumHandler("onBlur", this, ev);

    this.setState({
      focus: false
    });
  },

  getStateStyles: function () {
    var stateStyles;

    if (this.state.active) {
      stateStyles = this.styles.states.active;
    } else if (this.state.focus) {
      stateStyles = this.styles.states.focus;
    } else if (this.state.hover) {
      stateStyles = this.styles.states.hover;
    }

    return stateStyles;
  },

  getStyles: function (modifierStyles) {
    return _.assign(
      {},
      this.styles.default,
      modifierStyles,
      this.getStateStyles()
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

module.exports = ReactBrowserState;
