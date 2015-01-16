/*jshint unused:false */
var Router = require("react-router");
var React = require("react");
var App = require("./components/app");
var Recipes = require("./components/recipes");
var RecipeDetails = require("./components/recipe-details");
var NotFound = require("./components/notfound");
var Home = require("./components/home");
var RecipeForm = require("./components/recipe-form");

/**
Set up the Router object
*/

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

/**
* Declare routes
*/

var routes = (/*jshint ignore:start */
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="recipes" handler={Recipes}/> 
    <Route name="edit" path="/edit/:_id" handler={RecipeForm}/>
    <Route name="create" handler={RecipeForm}/>
    <Route name="RecipeDetails" path="/recipe/:_id" handler={RecipeDetails} />
    <NotFoundRoute handler={NotFound} />
  </Route>
/*jshint ignore:end */);

/**
Initiate the router
Using the HTML5 history API for cleaner URLs:
*/

Router.run(routes, function (Handler, state) {
  /**
  "Alternatively, you can pass the param data down..."
  https://github.com/rackt/react-router/blob/master/docs/guides/overview.md#dynamic-segments
  */
  var params = state.params;
  
  /*jshint ignore:start */
  React.render(<Handler params={params}/>, document.body);
  /*jshint ignore:end */
});