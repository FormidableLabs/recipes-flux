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
    gutters: React.PropTypes.bool.isRequired,
    verticalAlign: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      gutters: false,
      verticalAlign: "top"
    };
  },

  buildChildren: function (items) {
    return items.map(function (item, index) {
      return React.addons.cloneWithProps(item, {
        gutter: this.props.gutters,
        verticalAlign: this.props.verticalAlign,
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
