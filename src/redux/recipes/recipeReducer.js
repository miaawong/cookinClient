import * as actionTypes from "../recipes/recipeActionTypes";

const initState = {
    user: "",
    recipes: [],
    currentRecipe: "",
};

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            };
        case actionTypes.ADDED_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
            };
        case actionTypes.GET_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
            };
        default:
            return state;
    }
};

export default recipeReducer;
