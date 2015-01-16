/*jshint unused:false */
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
        
        this._recipes = db; /* todo api */

        this.listenTo(
            RecipeActions.recipeCreated, 
            this.recipeCreated
        );
    	this.listenTo(
            RecipeActions.inputChanged, 
            this.inputChange
        );
        this.listenTo(
            RecipeActions.ingredientDeleted, 
            this.ingredientDeleted
        );
        this.listenTo(
            RecipeActions.ingredientCreated, 
            this.ingredientCreated
        );
        this.listenTo(
            RecipeActions.recipeDeleted, 
            this.recipeDeleted
        );    
    },
    /**
    * HANDLE ACTIONS FROM COMPONENT
    */
    ingredientDeleted : function (payload) {
        this.updateRecipeIngredientList(payload._id, payload.index);
        this.shipToComponent(payload._id);
    },
    ingredientCreated : function (payload) {
        this.updateRecipeIngredientList(payload._id);
        this.shipToComponent(payload._id);
    },
    recipeCreated : function(payload) {
        this.createRecipe(payload);
        this.shipToComponent(payload._id);
    },
    recipeDeleted : function(payload) {
        this.deleteRecipe(payload._id);
        this.shipToComponent(payload._id);
    },
    inputChange : function(payload) {
        this.updateRecipe(
            payload._id,
            payload.accessor,
            payload.index,
            payload.value
        );
        this.shipToComponent(payload._id);
    },
    /**
    * TALK TO STORE
    */
    updateRecipeIngredientList: function (_id, index) {
        var recipe = this.getRecipe(_id);
        if (index || index === 0) {
            /* delete operation */
            recipe.ingredients.splice(index, 1);
        } else {
            /* create operation */
            recipe.ingredients.push(
                { 
                    ingredient: "", 
                    quantity: "", 
                    measurement: "", 
                    modifier: ""
                }
            );
        }
    },
    updateRecipe : function(_id, accessor, index, value) {
        var recipe = this.getRecipe(_id);
        if (index || index === 0) {
            recipe.ingredients[index][accessor] = value;
        } else {
            recipe[accessor] = value;
        }
        return;
    },
    createRecipe : function (recipe) {
        this._recipes.push(recipe);
        return;
    },
    createIngredient : function () {

    },
    deleteRecipe : function (_id) {
        _.remove(this._recipes, {_id: _id});
        return;        
    },
    getRecipe : function (_id) {
        return _.find(this._recipes, {_id: _id});
    },
    getRecipes : function () {
        return this._recipes;
    },
    /**
    * TALK TO COMPONENT
    */ 
    shipToComponent : function(_id) {
        if(_id) {
            this.trigger({data: this.getRecipe(_id)});      
        } else {
            this.trigger({data: this._recipes});
        }
    }
});


module.exports = RecipeStore;