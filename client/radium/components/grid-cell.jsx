var React = require("react");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var GridCell = React.createClass({
  mixins: [RadiumBrowserState],

  styles: {
    default: {
      boxSizing: "border-box",
      display: "inline-block",
      textAlign: "left",
      verticalAlign: "top",
      width: "100%"
    },
    modifiers: {
      gutter: {
        true: {
          padding: "0 0.5em"
        }
      }
    }
  },

  render: function () {
    var builtStyles = _.assign({}, this.getStyles(), {
      width: (this.props.width * 100) + "%"
    });

    return (
      <div style={builtStyles}>
        {this.props.children}
      </div>
    )
  }
});

module.exports = GridCell;
