// React
var React = require("react");
var RecipeStore = require("../stores");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Child Components
var Ingredient = require("./ingredient");
var Grid = require("../radium/components/grid");
var GridCell = require("../radium/components/grid-cell");

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

  portionsChanged: function (ev) {
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
        <Ingredient key={index} ingredient={ingredient} multiplier={self.state.multiplier} />
      );
    }

    var ingredientNodes = this.state.ingredients.map(createNodes);

    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>Serves: <input value={this.state.portions} onChange={this.portionsChanged} />
          <button onClick={this.savePortions}>Make Default</button>
        </p>
        <Grid gutters={true}>
          <GridCell width={1 / 2}>
            {ingredientNodes}
          </GridCell>
          <GridCell width={1 / 2}>
            <div dangerouslySetInnerHTML={{__html: this.state.parsedInstructions}} />
          </GridCell>
        </Grid>

        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = RecipeDetails;
