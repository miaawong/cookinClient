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

export const setNewRecipe = (data) => {
    return (dispatch) => {
        const {
            recipeName,
            recipeDesc,
            servings,
            duration_hour,
            duration_mins,
            ingredients,
            img,
        } = data;
        let { duration } = data;

        if (duration_hour && duration_mins) {
            duration = parseInt(duration_hour) * 60;
            duration = duration + parseInt(duration_mins);
        }

        const recipe = {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            img,
        };
        console.log(recipe, "recipe new");

        dispatch({
            type: recipeActionTypes.NEW_RECIPE,
            payload: recipe,
        });
    };
};

export const createRecipe = (token, data, history) => {
    return (dispatch) => {
        const {
            recipeName,
            recipeDesc,
            servings,
            duration_hour,
            duration_mins,
            ingredients,
            instructions,
            img,
        } = data;
        let duration = parseInt(duration_hour) * 60;
        duration = duration + parseInt(duration_mins);

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
                let recipeId = res.data.recipe._id;
                let recipe = res.data.recipe;
                history.push(`/recipes/${recipeId}`);
                dispatch({
                    type: recipeActionTypes.ADD_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const editRecipe = (recipeId, data, token, history) => {
    console.log("edit");
    return (dispatch) => {
        const {
            recipeName,
            recipeDesc,
            servings,
            duration_hour,
            duration_mins,
            ingredients,
            instructions,
            img,
        } = data;
        let duration = parseInt(duration_hour) * 60;
        duration = duration + parseInt(duration_mins);
        const updateRecipe = {
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
            .put(
                `http://localhost:3000/api/recipes/${recipeId}`,
                updateRecipe,
                config
            )
            .then((res) => {
                console.log(res);
                let recipe = res.data.recipe;
                history.push(`/recipes/${recipeId}`);
                dispatch({
                    type: recipeActionTypes.EDIT_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getCurrentRecipe = (recipeId, token, history) => {
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
                history.push(`/recipes/${recipeId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const deleteRecipe = (recipeId, token, history) => {
    return (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .delete(`http://localhost:3000/api/recipes/${recipeId}`, config)
            .then((res) => {
                console.log("deleted");
                history.push("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
