import * as actionTypes from "../actionTypes/recipeActionTypes";
import axios from "axios";

export const getAllRecipes = (token) => {
    return (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("http://localhost:3000/api/users/recipes", config)
            .then((res) => {
                let recipes = res.data.recipe;
                dispatch({
                    type: actionTypes.GET_ALL_RECIPES,
                    payload: recipes,
                });
            })

            .catch((err) => {
                console.log(err);
            });
    };
};
