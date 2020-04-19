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
                let { _id, name, email } = res.data.userData;

                let newRecipes = recipes.map((recipe) => {
                    return recipe;
                });
                console.log(newRecipes);

                document.cookie = `refreshToken=${refreshToken}`;
                dispatch({
                    type: actionTypes.LOGIN_REQUEST,
                    payload: {
                        email,
                        token,
                        _id,
                        name,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getJWT = () => {
    console.log("getjwt");
    return (dispatch) => {
        axios
            .post("http://localhost:3000/api/auth/refresh_token", null, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("newjwt", res);
                let { JWToken, _id, name, email, password } = res.data;

                dispatch({
                    type: actionTypes.GET_JWT,
                    payload: {
                        JWToken,
                        _id,
                        name,
                        email,
                        password,
                    },
                });
                // this is so nasty but it works
                // this.isAuthed(this.state.JWToken);
            })
            .catch((err) => {
                console.log(err, "newjwterr");
            });
    };
};
