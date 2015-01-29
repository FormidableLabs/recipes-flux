// React
var React = require("react");
var RecipeStore = require("../stores");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Child Components
var Ingredient = require("./ingredient");

// Component
function getState(id) {
  return RecipeStore.getRecipe(id);
}

var RecipeDetails = React.createClass({
  displayName: "RecipeDetails",
  propTypes: {},
  mixins: [RecipeStore.mixin],

  getInitialState: function () {
    return getState(this.props.params._id);
  },

  componentWillMount: function () {
    this.parseInstructions();
  },

  componentWillUnmount: function () {},

  onChange: function () {
    this.setState(getState(this.props.params._id));
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
    function createNodes (ingredient, index) {
      return (
        <Ingredient key={index} ingredient={ingredient}/>
      );
    }

    var ingredientNodes = this.state.ingredients.map(createNodes);

    return (
      <div className="Recipe">
        <p className="Recipe-title">{this.state.title}</p>
        <p> Serves: {this.state.portions} (change)</p>
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
