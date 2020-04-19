import * as actionTypes from "../actionTypes/recipeActionTypes";

const initState = {
    recipes: [],
};

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_RECIPES:
            return {
                ...state,

                recipes: action.payload.recipes,
            };
            break;

        default:
            return initState;
    }
};

export default recipeReducer;
