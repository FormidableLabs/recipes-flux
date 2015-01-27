var React = require("react/addons");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var Grid = React.createClass({
  mixins: [RadiumBrowserState],

  styles: {
    default: {
      display: "block",
      margin: 0,
      padding: 0,
      textAlign: "left"
    },
    modifiers: {
      align: {
        center: {
          textAlign: "center"
        },
        right: {
          textAlign: "right"
        }
      },
      gutters: {
        true: {
          margin: "0 -0.5em"
        }
      }
    }
  },

  buildChildren: function (items) {
    return items.map(function (item, index) {
      return React.addons.cloneWithProps(item, {
        gutter: true,
        key: index
      });
    });
  },

  render: function () {
    return (
      <div style={this.getStyles()}>
        {this.buildChildren(this.props.children)}
      </div>
    )
  }
});

module.exports = Grid;
