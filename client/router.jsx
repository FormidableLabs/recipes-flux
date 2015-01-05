var Router = require('react-router');
var React = require('react');
var App = require('./components/app');
var Recipes = require('./components/recipes')
var RecipeDetails = require('./components/recipeDetails')
var NotFound = require('./components/notfound')
var Home = require('./components/home')

/**
Set up the Router object
*/

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

/**
Declare routes
*/

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="recipes" handler={Recipes}/>
    <Route name="RecipeDetails" path="/recipe/:recipeId" handler={RecipeDetails} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

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

  React.render(<Handler params={params}/>, document.querySelector(".js-content"));
});
