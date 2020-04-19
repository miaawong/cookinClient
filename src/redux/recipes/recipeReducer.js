import * as actionTypes from "../recipes/recipeActionTypes";

const initState = {
    user: "",
    recipes: [],
};

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            };
        default:
            return state;
    }
};

export default recipeReducer;
