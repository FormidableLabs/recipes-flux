var React = require("react/addons");

var RadiumBrowserState = require("../mixins/radium-browser-state");

var ButtonGroup = React.createClass({
  mixins: [RadiumBrowserState],

  buildChildren: function (items) {
    return items.map(function (item, index) {
      var newProps = {
        key: index
      };
      var newStyles = newProps.styleOverrides = {};

      if (index === 0) {
        newStyles.borderTopRightRadius = 0;
        newStyles.borderBottomRightRadius = 0;
      } else if (index === items.length - 1) {
        newStyles.borderTopLeftRadius = 0;
        newStyles.borderBottomLeftRadius = 0;
      } else {
        newStyles.borderRadius = 0;
      }

      if (index > 0) {
        newProps.buttonGroupBorder = true;
        newStyles.marginLeft = -1;
      }

      return React.addons.cloneWithProps(item, newProps);
    });
  },

  render: function () {
    return (/*jshint ignore:start*/
      <div>
        {this.buildChildren(this.props.children)}
      </div>
    /*jshint ignore:end*/);
  }
});

module.exports = ButtonGroup;
