// React
var React = require("react");
var RecipeStore = require("../stores");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Child Components
var Ingredient = require("./ingredient");

var RecipeActions = require("../actions");
// Component
function getRecipeById(id) {
  return RecipeStore.getRecipe(id);
}

var RecipeDetails = React.createClass({
  displayName: "RecipeDetails",
  propTypes: {},
  mixins: [RecipeStore.mixin],

  getInitialState: function () {
    return getRecipeById(this.props.params._id);
  },

  componentWillMount: function () {
    this.parseInstructions();
  },

  componentWillUnmount: function () {},

  onChange: function () {},

  servingChanged: function (ev) {
    var portions = ev.target.value.trim();

    this.setState({
      portions: portions,
      multiplier: portions !== "" && !isNaN(portions) ?
        portions / getRecipeById(this.props.params._id).portions :
        1
    });
  },

  savePortions: function () {
    // TODO: Check for not valid values and unchanged values
    RecipeActions.portionsChanged({
      portions: this.state.portions,
      _id: this.props.params._id
    });
  },

  parseInstructions: function () {
    // Process instructions to split string on newline
    var str = this.state.instructions;
    var html = "<p>" + str.replace(/\n([ \t]*\n)+/g, "</p><p>")
                          .replace(/\n/g, "</p><p>") + "</p>";
    this.state.parsedInstructions = html;
    // Make servings a controlled input
    // http://facebook.github.io/react/docs/forms.html#controlled-components
  },

  render: function () {
    var self = this;

    function createNodes(ingredient, index) {
      return (
        <Ingredient key={index} ingredient={ingredient} multiplier={self.state.multiplier}/>
      );
    }

    var ingredientNodes = this.state.ingredients.map(createNodes);

    return (
      <div className="Recipe">
        <p className="Recipe-title">{this.state.title}</p>
        <p> Serves: <input value={this.state.portions} onChange={this.servingChanged} />
        <button onClick={this.savePortions}>Make Default</button>
        </p>
        <div className="row">
          <div className="col-lg-4">
            {ingredientNodes}
          </div>
          <div
            className="Recipe-instructions col-lg-4"
            dangerouslySetInnerHTML={{__html: this.state.parsedInstructions}}
          />
        </div>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});

module.exports = RecipeDetails;
