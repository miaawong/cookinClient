import * as recipeActionTypes from "./recipeActionTypes";
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
                    type: recipeActionTypes.GET_ALL_RECIPES,
                    payload: recipes,
                });
            })

            .catch((err) => {
                console.log(err);
            });
    };
};

export const createRecipe = (token, data, history) => {
    return (dispatch) => {
        const {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            instructions,
            img,
        } = data;
        const newRecipe = {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            instructions,
            img,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post("http://localhost:3000/api/recipes/", newRecipe, config)
            .then((res) => {
                console.log(res);
                let recipeId = res.data.recipe._id;
                let recipe = res.data.recipe;
                console.log(res.data);
                history.push(`/recipes/${recipeId}`);
                dispatch({
                    type: recipeActionTypes.ADDED_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getCurrentRecipe = (recipeId, token) => {
    return (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get(`http://localhost:3000/api/recipes/${recipeId}`, config)
            .then((res) => {
                let recipe = res.data.recipe;
                dispatch({
                    type: recipeActionTypes.GET_CURRENT_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
