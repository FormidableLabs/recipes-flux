var Reflux = require("reflux");
var RecipeActions = require("./actions");
// var api = require('api');

// Creates a DataStore
var RecipeStore = Reflux.createStore({
    // Initial setup
    init: function() {

        /**
        Reflux Step 3: Register the store to listen to the action
        */

        this.listenTo(RecipeActions.recipeAdded, this.recipeAddedCallback)
    	
        //api.getRecipes();
    },

    /** 
    Step 5: Callback **receives arg from component** and
    Step 6: does something with that arg like update itself or manipulate the data
    Step 7: calls trigger which broadcasts data to send back to any components listening
    
    */

    recipeAddedCallback: function(data) {
        var result = data.foo += " ...and the store recieved it...";
        // Pass on the arg to listening components
        this.trigger(result);
    }

});

module.exports = RecipeStore;