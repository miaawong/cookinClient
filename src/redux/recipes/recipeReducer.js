import * as recipeActionTypes from "./recipeActionTypes";
import * as authActionTypes from "../auth/authActionTypes";

const initState = {
    recipes: [],
    currentRecipe: {},
    edit: false,
};

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case recipeActionTypes.GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            };
        case recipeActionTypes.ADD_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
                recipes: [...state.recipes, action.payload],
            };
        case recipeActionTypes.EDIT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
                edit: false,
            };
        case recipeActionTypes.GET_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
            };
        case recipeActionTypes.CLEAR_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: {},
            };
        case recipeActionTypes.EDIT_STATE:
            return {
                ...state,
                edit: action.payload,
            };
        case authActionTypes.LOGOUT:
            return {
                recipes: initState.recipes,
                currentRecipe: initState.currentRecipe,
                edit: initState.edit,
            };
        default:
            return state;
    }
};

export default recipeReducer;
