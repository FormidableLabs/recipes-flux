// React
var React = require("react");
var Router = require("react-router");
var App = require("./components/app");
var Home = require("./components/home");
var Recipes = require("./components/recipes");
var RecipeDetails = require("./components/recipe-details");
var RecipeForm = require("./components/recipe-form");
var NotFound = require("./components/notfound");
var RecipeActions = require("./actions/recipe-actions");
var Config = require("./config");

// Request
var request = require("superagent");

// Set up Router object
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="recipes" handler={Recipes} />
    <Route name="edit" path="/edit/:_id" handler={RecipeForm} />
    <Route name="create" handler={RecipeForm} />
    <Route name="RecipeDetails" path="/recipe/:_id" handler={RecipeDetails} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = {
  run: function (el) {
    request
      .get(Config.apiServer + "/recipes")
      .set("Accept", "application/json")
      .end(function (error, res) {
        RecipeActions.loadRecipes(res.text);
        Router.run(routes, function (Handler, state) {
          // "Alternatively, you can pass the param data down..."
          // https://github.com/rackt/react-router/blob/master/docs/guides/
          // overview.md#dynamic-segments
          var params = state.params;
          React.render(<Handler params={params} />, el);
        });
      });
  }
};
