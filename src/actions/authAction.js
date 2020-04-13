import * as actionTypes from "../actionTypes/authActionTypes";
import axios from "axios";

export const login = (email, password) => {
    console.log("in auth actions");
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const loginData = { email, password };
    console.log(loginData);
    return (dispatch) =>
        axios
            .post("http://localhost:3000/api/auth/login", loginData, config)
            .then((res) => {
                dispatch({ type: actionTypes.LOGIN_REQUEST, res });
            });
};

// this.setState({ JWToken: res.data.token });
// const { refreshToken } = res.data;
// console.log(refreshToken, "refreshToken");
// document.cookie = `refreshToken=${refreshToken}`;
// this.isAuthed(this.state.JWToken);
