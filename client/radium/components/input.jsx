var React = require("react");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var Input = React.createClass({
  mixins: [RadiumBrowserState],

  styles: {
    default: {
      display: "block",
      width: "100%",
      fontSize: 16,
      borderRadius: "0.3em",
      padding: "0.4em",
      border: "1px solid #ccc",
      lineHeight: 1.2
    }
  },

  getDefaultProps: function () {
    return {
      type: "text"
    }
  },

  render: function () {
    if (this.props.type === "textarea") {
      return (
        <textarea
          style={this.getStyles()}
          {...this.props} />
      )
    }

    return (
      <input
        style={this.getStyles()}
        {...this.props} />
    );
  }
});

module.exports = Input;
