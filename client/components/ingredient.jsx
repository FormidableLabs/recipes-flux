// React
var React = require("react");

// Create fractions from decimals
// https://www.npmjs.com/package/lb-ratio
var ratio = require("lb-ratio");
var characterFor = require("vulgarities/charFor");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

function toUnicode(fractionString) {
  var f = fractionString.split("/");
  var uniChar = characterFor(f[0], f[1]);
  if (uniChar) {
    return uniChar;
  }
  return fractionString;
}

// Component
var Ingredient = React.createClass({
  displayName: "Ingredient",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return {}; },

  componentWillMount: function () {
  },

  componentWillUnmount: function () {},

  render: function () {
    // TODO: Move to separate function
    // Decimal to fraction
    var q = this.props.ingredient.quantity;
    var fraction;

    if (!isNaN(this.props.multiplier)) {
      q = q * this.props.multiplier;
    }

    if (!isNaN(q)) {
      if (q < 1) {
        var uni = toUnicode(ratio.parse(q).simplify().toString());
        fraction = uni;
      } else if (q % 1 !== 0) {
        var frac = Math.floor(q) +
                    " " +
                    toUnicode(ratio.parse(q % 1).simplify().toString());
        fraction = frac;
      } else {
        // Whole number
        fraction = q;
      }
    }
    return (
      <div className="row Recipe-ingredient">
        <div className="col-lg-6">
          <p className="Recipe-ingredientLeft">
            {this.props.ingredient.ingredient}
          </p>
        </div>
        <div className="col-lg-6">
          <p className="Recipe-ingredientRight">
            {fraction} {this.props.ingredient.measurement}
            <em> {this.props.ingredient.modifier}</em>
          </p>
        </div>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Ingredient;
