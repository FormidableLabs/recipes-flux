var Reflux = require("reflux");
var RecipeActions = require("./actions");
var request = require("superagent");
var db = require("./mock-db");
var _ = require("lodash");
// var uuid = require("uuid");

// Creates a DataStore
var RecipeStore = Reflux.createStore({
    // Initial setup
    init: function() {

        /* set the store value to the mock database data */
        this._recipes = db;


        /**
        Reflux Step 3: Register the store to listen to the action
        */
        this.listenTo(RecipeActions.recipeAdded, this.recipeAddedCallback);
    	this.listenTo(RecipeActions.inputChange, this.inputChange)
        //api.getRecipes();
    },

    /** 
    * Step 5: Callback **receives arg from component** and
    * Step 6: does something with that arg 
    * like update itself or manipulate the data
    * Step 7: calls trigger which broadcasts data 
    * to send back to any components listening
    */

    recipeAddedCallback: function(data) {
        /**
        * API
        */
        this.trigger("receipeAddedCallback received data: ", data);
    },
    getInitialState : function () {
        /** 
        * For the edit case where we need to bootstrap data,
        * return some data
        */
        return this._recipes;
    },
    inputChange: function(data) {

        /**
        * We have some new info from an input.
        * Let's reach into our data structure and find the index
        * of the recipe being manipulated, or create it
        * if it doesn't exist
        */
        var indexInRecipes = _.findIndex(this._recipes, {_id: data._id})

        if (indexInRecipes !== -1) {
            /* it exists, manipulate in place */
            this._recipes[indexInRecipes][data.variableNameInStore] = data.value;
            this.trigger({data: this._recipes, index: indexInRecipes});
            // this.trigger(this._recipes);
            window.recipes = this._recipes

        } else {
            /* it doesn't exist, create it */
            console.log("this id doesn't exist in the store, creating it");
            this._recipes.push();
            console.log(this._recipes);
            this.trigger({data: this._recipes, index: indexInRecipes});
        }

        /**
        * Pass this._recipes to listening components
        */        
        //this.trigger(this._recipes);
    }
});


module.exports = RecipeStore;