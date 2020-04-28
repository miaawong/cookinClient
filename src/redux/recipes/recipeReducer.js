import * as actionTypes from "../recipes/recipeActionTypes";

const initState = {
    user: "",
    recipes: [],
    currentRecipe: {},
    edit: false,
};

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            };
        case actionTypes.ADD_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
                recipes: [...state.recipes, action.payload],
            };
        case actionTypes.EDIT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
                edit: false,
            };
        case actionTypes.GET_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
            };
        case actionTypes.CLEAR_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: {},
            };
        case actionTypes.EDIT_STATE:
            return {
                ...state,
                edit: action.payload,
            };
        default:
            return state;
    }
};

export default recipeReducer;
