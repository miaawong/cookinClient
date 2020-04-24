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
            img,
        } = data;
        const newRecipe = {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
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
                let recipeId = res.data.recipes.recipeId;
                history.push(`/recipes/${recipeId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
