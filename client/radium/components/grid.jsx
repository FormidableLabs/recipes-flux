/*jshint unused:false */
var React = require("react/addons");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var Grid = React.createClass({
  mixins: [RadiumBrowserState],

  getStyles: function () {
    return {
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
    };
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
    return React.Children.map(items, function (item, index) {
      return React.addons.cloneWithProps(item, {
        gutter: this.props.gutters,
        verticalAlign: this.props.verticalAlign,
        key: index
      });
    }, this);
  },

  render: function () {
    var styles = this.buildStyles(this.getStyles());

    return (/*jshint ignore:start*/
      <div style={styles}>
        {this.buildChildren(this.props.children)}
      </div>
    /*jshint ignore:end*/);
  }
});

module.exports = Grid;
