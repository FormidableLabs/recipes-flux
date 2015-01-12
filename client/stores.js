var Reflux = require("reflux");
var RecipeActions = require("./actions");
var request = require("superagent")

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
        request.post("/recipeAdded")
            .send(data)
            .end(function(err, res){
                if(err) {
                    console.log("error posting to recipeAdded", err)
                }
                /**
                * Pass on the arg to listening components
                */
                this.trigger("we're back");
            })
        }

});

module.exports = RecipeStore;