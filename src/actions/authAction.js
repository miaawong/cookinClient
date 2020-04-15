import * as actionTypes from "../actionTypes/authActionTypes";
import axios from "axios";

export const login = (email, password) => {
    return (dispatch) => {
        const loginData = { email, password };
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .post("http://localhost:3000/api/auth/login", loginData, config)
            .then((res) => {
                console.log(res.data);
                let { token, refreshToken, recipes } = res.data;
                let { _id, name, email, password } = res.data.userData;

                let recipeNames = recipes.map((recipe) => {
                    return recipe.recipeName;
                });

                document.cookie = `refreshToken=${refreshToken}`;
                dispatch({
                    type: actionTypes.LOGIN_REQUEST,
                    payload: {
                        email,
                        token,
                        _id,
                        name,
                        password,
                        recipeNames,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
