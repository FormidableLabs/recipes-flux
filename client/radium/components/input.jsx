/*jshint unused:false */
var React = require("react");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var Input = React.createClass({
  mixins: [RadiumBrowserState],

  styles: {
    standard: {
      display: "block",
      width: "100%",
      fontSize: 16,
      borderRadius: "0.3em",
      padding: "0.4em",
      border: "1px solid #ccc",
      lineHeight: 1.2,
      fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      boxSizing: "border-box"
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
      type: {
        textarea: {
          resize: "vertical"
        }
      }
    }
  },

  propTypes: {
    label: function (props, propName, componentName) {
      if (!props.dangerouslyDisableLabel && typeof props.label !== "string") {
        return new Error(
          "Required prop `" + propName + "` was not specified in `" +
          componentName + "`. Set `" + propName +
          "` to a string describing the input. If you are implementing your " +
          "own label, set `dangerouslyDisableLabel` to `true`. For more " +
          "information on labels, see " +
          "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label."
        );
      }
    }
  },

  getInitialState: function () {
    return {
      textareaHeight: null,
      textareaCloneWidth: null
    };
  },

  getDefaultProps: function () {
    return {
      type: "text",
      dangerouslyDisableLabel: false,
      textareaResize: false
    };
  },

  componentDidMount: function () {
    this.resizeTextarea();
  },

  componentDidUpdate: function () {
    this.resizeTextarea();
  },

  resizeTextarea: function () {
    if (this.props.textareaResize) {
      var oldHeight = this.state.textareaHeight;
      var newHeight = this.getInputElement().scrollHeight;

      if (oldHeight !== newHeight) {
        this.setState({
          textareaHeight: newHeight
        });
      }
    }
  },

  getInputElement: function () {
    return this.refs.input.getDOMNode();
  },

  buildInput: function () {
    var inputStyles = this.getStyles();

    if (this.props.textareaResize && this.state.textareaHeight) {
      inputStyles.height = this.state.textareaHeight;
    }

    var textarea = (/*jshint ignore:start*/
      <textarea
        ref="input"
        style={inputStyles}
        {...this.props}
        />
    /*jshint ignore:end*/);
    var input = (/*jshint ignore:start*/
      <input
        ref="input"
        style={inputStyles}
        {...this.props} />
    /*jshint ignore:end*/);

    if (this.props.type === "textarea") {
      return textarea;
    }

    return input;
  },

  buildLabel: function (inputEl) {
    var visibleLabelStyles = {
      display: "inline-block",
      marginBottom: "0.25em"
    };
    var hiddenLabelStyles = {
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      position: "absolute",
      width: 1
    };
    var labelStyles;

    if (this.props.labelHidden) {
      labelStyles = hiddenLabelStyles;
    } else {
      labelStyles = visibleLabelStyles;
    }

    return (/*jshint ignore:start*/
      <label>
        <span style={labelStyles}>
          {this.props.label}
        </span>
        {inputEl}
      </label>
    /*jshint ignore:end*/);
  },

  render: function () {
    var inputEl = this.buildInput();

    if (this.props.dangerouslyDisableLabel) {
      return inputEl;
    }

    return this.buildLabel(inputEl);
  }
});

module.exports = Input;
