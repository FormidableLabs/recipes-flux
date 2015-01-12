var React = require('react');

/** 
Router
*/

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

/**
Child Components
*/


/**
Component
*/

var Nav = React.createClass({  
  displayName : 'Nav',
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  render : function() { return (/*jshint ignore:start */
    <div>
      <span className="navLink"> <Link to="app"> Home</Link> </span>
      <span className="navLink"> <Link to="recipes"> Recipes</Link></span>
      <span className="navLink"> <Link to="add">Add Recipe</Link></span>
    </div>
    /*jshint ignore:end */)
  }
});

/**
Note {...this.props}, see:

http://facebook.github.io/react/docs/jsx-spread.html
https://github.com/rackt/react-router/blob/master/docs/guides/overview.md#dynamic-segments
*/ 

module.exports = Nav;