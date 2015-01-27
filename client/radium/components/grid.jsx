var React = require("react/addons");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var Grid = React.createClass({
  mixins: [RadiumBrowserState],

  styles: {
    standard: {
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
        margin: "0 -0.5em"
      }
    }
  },

  propTypes: {
    gutters: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function () {
    return {
      gutters: false
    };
  },

  buildChildren: function (items) {
    return items.map(function (item, index) {
      return React.addons.cloneWithProps(item, {
        gutter: this.props.gutters,
        key: index
      });
    }.bind(this));
  },

  render: function () {
    return (/*jshint ignore:start*/
      <div style={this.getStyles()}>
        {this.buildChildren(this.props.children)}
      </div>
    /*jshint ignore:end*/);
  }
});

module.exports = Grid;
