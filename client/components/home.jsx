var React = require('react');

// Router
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Home = React.createClass({  
  displayName : 'Home',
  propTypes: {},
  mixins : [],
  getInitialState : function() { return null },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  render : function() {return(
    /*jshint ignore:start unused:false*/
    <div>
      <p> 
        home rendered 
      </p>
      <RouteHandler/>
    </div>
  /*jshint ignore:end */)}
});

module.exports = Home;